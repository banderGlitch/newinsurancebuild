/*
 * Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features
 */
import {
  VehicleManagement,
  VehicleManagement_VehicleRegistered,
} from "generated";

VehicleManagement.VehicleRegistered.handler(async ({ event, context }) => {
  const entity: VehicleManagement_VehicleRegistered = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    vehicleId: event.params.vehicleId,
    owner: event.params.owner,
    model: event.params.model,
  };

  context.VehicleManagement_VehicleRegistered.set(entity);
});

