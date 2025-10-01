import React, { useState } from 'react';
import styled from 'styled-components';
import { designTokens } from '../theme/tokens';

const IoTContainer = styled.div`
  padding: ${designTokens.spacing.xl};
  border-radius: ${designTokens.borders.radius.medium};
  background: ${designTokens.colors.cardBgLight};
  margin: ${designTokens.spacing.xxl} 0;
  border: 1px solid rgba(0,0,0,0.1);
  
  .dark-mode & {
    background: ${designTokens.colors.cardBgDark};
    border: 1px solid rgba(255,255,255,0.1);
  }
`;

const IoTHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${designTokens.spacing.lg};
`;

const IoTTitle = styled.h2`
  font-size: ${designTokens.typography.fontSize.h3};
  margin: 0;
  color: ${designTokens.colors.text.primary.light};
  
  .dark-mode & {
    color: ${designTokens.colors.text.primary.dark};
  }
`;

const IoTStatus = styled.span<{ connected: boolean }>`
  padding: ${designTokens.spacing.xs} ${designTokens.spacing.md};
  border-radius: 50px;
  font-size: ${designTokens.typography.fontSize.caption};
  font-weight: ${designTokens.typography.fontWeight.medium};
  
  ${props => props.connected ? `
    background: ${designTokens.colors.status.success}20;
    color: ${designTokens.colors.status.success};
  ` : `
    background: ${designTokens.colors.status.error}20;
    color: ${designTokens.colors.status.error};
  `}
`;

const DevicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${designTokens.spacing.md};
`;

const DeviceCard = styled.div<{ active?: boolean }>`
  padding: ${designTokens.spacing.lg};
  border-radius: ${designTokens.borders.radius.small};
  background: ${designTokens.colors.background.light};
  text-align: center;
  transition: all ${designTokens.transitions.duration.normal};
  
  .dark-mode & {
    background: ${designTokens.colors.background.dark};
  }
  
  ${props => props.active && `
    border: 2px solid ${designTokens.colors.primary.indigo};
    background: ${designTokens.colors.primary.indigo}10;
  `}
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: ${designTokens.shadows.medium};
  }
`;

const DeviceIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${designTokens.colors.primary.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${designTokens.spacing.md};
  font-size: 24px;
`;

const DeviceName = styled.h3`
  font-size: ${designTokens.typography.fontSize.body};
  margin: 0 0 ${designTokens.spacing.xs};
  color: ${designTokens.colors.text.primary.light};
  
  .dark-mode & {
    color: ${designTokens.colors.text.primary.dark};
  }
`;

const DeviceStatus = styled.div<{ status: string }>`
  font-size: ${designTokens.typography.fontSize.caption};
  font-weight: ${designTokens.typography.fontWeight.medium};
  
  ${props => {
    switch (props.status) {
      case 'active':
        return `
          color: ${designTokens.colors.status.success};
        `;
      case 'idle':
        return `
          color: ${designTokens.colors.status.warning};
        `;
      case 'error':
        return `
          color: ${designTokens.colors.status.error};
        `;
      default:
        return `
          color: ${designTokens.colors.text.secondary.light};
          
          .dark-mode & {
            color: ${designTokens.colors.text.secondary.dark};
          }
        `;
    }
  }}
`;

const ToggleSwitch = styled.div`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  margin-top: ${designTokens.spacing.md};
`;

const SwitchTrack = styled.div<{ enabled: boolean }>`
  width: 40px;
  height: 24px;
  border-radius: 12px;
  background-color: ${props => props.enabled ? designTokens.colors.primary.indigo : '#ccc'};
  position: relative;
  margin-right: 10px;
  transition: background-color 0.3s;
`;

const SwitchThumb = styled.div<{ enabled: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
  top: 2px;
  left: ${props => props.enabled ? '18px' : '2px'};
  transition: left 0.3s;
`;

interface Device {
  id: number;
  name: string;
  type: string;
  status: 'active' | 'idle' | 'error' | 'offline';
  icon: string;
  enabled: boolean;
}

const IoTIntegration = () => {
  const [devices, setDevices] = useState<Device[]>([
    {
      id: 1,
      name: 'Smart Doorbell',
      type: 'Security',
      status: 'active',
      icon: '🚪',
      enabled: true
    },
    {
      id: 2,
      name: 'Motion Sensor',
      type: 'Security',
      status: 'idle',
      icon: '🚶',
      enabled: true
    },
    {
      id: 3,
      name: 'Water Leak Detector',
      type: 'Plumbing',
      status: 'active',
      icon: '💧',
      enabled: true
    },
    {
      id: 4,
      name: 'Smoke Detector',
      type: 'Safety',
      status: 'offline',
      icon: '🔥',
      enabled: false
    }
  ]);

  const toggleDevice = (deviceId: number) => {
    setDevices(devices.map(device => {
      if (device.id === deviceId) {
        return { ...device, enabled: !device.enabled };
      }
      return device;
    }));
  };

  const connectedDevices = devices.filter(device => device.enabled).length;
  const totalDevices = devices.length;

  return (
    <IoTContainer>
      <IoTHeader>
        <IoTTitle>🏠 IoT Integration</IoTTitle>
        <IoTStatus connected={connectedDevices > 0}>
          {connectedDevices}/{totalDevices} Devices Connected
        </IoTStatus>
      </IoTHeader>
      
      <DevicesGrid>
        {devices.map((device) => (
          <DeviceCard key={device.id} active={device.enabled}>
            <DeviceIcon>{device.icon}</DeviceIcon>
            <DeviceName>{device.name}</DeviceName>
            <DeviceStatus status={device.status}>
              {device.status.charAt(0).toUpperCase() + device.status.slice(1)}
            </DeviceStatus>
            
            <ToggleSwitch onClick={() => toggleDevice(device.id)}>
              <SwitchTrack enabled={device.enabled}>
                <SwitchThumb enabled={device.enabled} />
              </SwitchTrack>
              <span>{device.enabled ? 'ON' : 'OFF'}</span>
            </ToggleSwitch>
          </DeviceCard>
        ))}
      </DevicesGrid>
    </IoTContainer>
  );
};

export default IoTIntegration;