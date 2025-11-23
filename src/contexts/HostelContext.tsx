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

interface HostelContextType {
  config: HostelConfig;
  setConfig: (config: HostelConfig) => void;
  rooms: Room[];
  updateRoom: (id: string, updates: Partial<Room>) => void;
  addRoom: (room: Room) => void;
  deleteRoom: (id: string) => void;
}

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

  useEffect(() => {
    localStorage.setItem('hostelConfig', JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    localStorage.setItem('hostelRooms', JSON.stringify(rooms));
  }, [rooms]);

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

  return (
    <HostelContext.Provider value={{ config, setConfig, rooms, updateRoom, addRoom, deleteRoom }}>
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
