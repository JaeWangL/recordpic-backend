import { DevicePreviewDto } from '../dtos';
import { DeviceEntity } from '../domain';

export const toDevicePreviewDTO = (device: DeviceEntity): DevicePreviewDto => ({
  type: device.type,
  deviceToken: device.deviceToken,
});

export const toDevicesPreviewDTO = (Devices: DeviceEntity[]): DevicePreviewDto[] =>
  Devices.map((Device) => toDevicePreviewDTO(Device));
