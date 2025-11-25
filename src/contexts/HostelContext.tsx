import React, { createContext, useContext, useState, useEffect } from 'react';

interface HostelConfig {
  totalHostels: number;
  totalRooms: number;
  totalBuildings: number;
  isConfigured: boolean;
}

interface Room {
  id: string;
  number: string;
  building: string;
  hostel: string;
  capacity: number;
  occupied: number;
  occupants: string[];
}

interface Building {
  id: string;
  name: string;
  energy: number;
  occupancy: number;
  temperature: number;
  status: "optimal" | "warning" | "critical";
  microcontroller: string;
}

interface HostelContextType {
  config: HostelConfig;
  setConfig: (config: HostelConfig) => void;
  rooms: Room[];
  updateRoom: (id: string, updates: Partial<Room>) => void;
  addRoom: (room: Room) => void;
  deleteRoom: (id: string) => void;
  buildings: Building[];
  updateBuilding: (id: string, updates: Partial<Building>) => void;
  addBuilding: (building: Building) => void;
  deleteBuilding: (id: string) => void;
}

export type { Building };

const HostelContext = createContext<HostelContextType | undefined>(undefined);

export const HostelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfigState] = useState<HostelConfig>(() => {
    const saved = localStorage.getItem('hostelConfig');
    return saved ? JSON.parse(saved) : {
      totalHostels: 0,
      totalRooms: 0,
      totalBuildings: 0,
      isConfigured: false,
    };
  });

  const [rooms, setRooms] = useState<Room[]>(() => {
    const saved = localStorage.getItem('hostelRooms');
    return saved ? JSON.parse(saved) : [];
  });

  const [buildings, setBuildings] = useState<Building[]>(() => {
    const saved = localStorage.getItem('hostelBuildings');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('hostelConfig', JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    localStorage.setItem('hostelRooms', JSON.stringify(rooms));
  }, [rooms]);

  useEffect(() => {
    localStorage.setItem('hostelBuildings', JSON.stringify(buildings));
  }, [buildings]);

  const setConfig = (newConfig: HostelConfig) => {
    setConfigState(newConfig);
  };

  const updateRoom = (id: string, updates: Partial<Room>) => {
    setRooms(prev => prev.map(room => room.id === id ? { ...room, ...updates } : room));
  };

  const addRoom = (room: Room) => {
    setRooms(prev => [...prev, room]);
  };

  const deleteRoom = (id: string) => {
    setRooms(prev => prev.filter(room => room.id !== id));
  };

  const updateBuilding = (id: string, updates: Partial<Building>) => {
    setBuildings(prev => prev.map(building => building.id === id ? { ...building, ...updates } : building));
  };

  const addBuilding = (building: Building) => {
    setBuildings(prev => [...prev, building]);
  };

  const deleteBuilding = (id: string) => {
    setBuildings(prev => prev.filter(building => building.id !== id));
  };

  return (
    <HostelContext.Provider value={{ 
      config, 
      setConfig, 
      rooms, 
      updateRoom, 
      addRoom, 
      deleteRoom,
      buildings,
      updateBuilding,
      addBuilding,
      deleteBuilding
    }}>
      {children}
    </HostelContext.Provider>
  );
};

export const useHostel = () => {
  const context = useContext(HostelContext);
  if (!context) {
    throw new Error('useHostel must be used within HostelProvider');
  }
  return context;
};
