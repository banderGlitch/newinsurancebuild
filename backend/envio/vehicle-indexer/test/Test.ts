import assert from "assert";
import { 
  TestHelpers,
  VehicleManagement_VehicleRegistered
} from "generated";
const { MockDb, VehicleManagement } = TestHelpers;

describe("VehicleManagement contract VehicleRegistered event tests", () => {
  // Create mock db
  const mockDb = MockDb.createMockDb();

  // Creating mock for VehicleManagement contract VehicleRegistered event
  const event = VehicleManagement.VehicleRegistered.createMockEvent({/* It mocks event fields with default values. You can overwrite them if you need */});

  it("VehicleManagement_VehicleRegistered is created correctly", async () => {
    // Processing the event
    const mockDbUpdated = await VehicleManagement.VehicleRegistered.processEvent({
      event,
      mockDb,
    });

    // Getting the actual entity from the mock database
    let actualVehicleManagementVehicleRegistered = mockDbUpdated.entities.VehicleManagement_VehicleRegistered.get(
      `${event.chainId}_${event.block.number}_${event.logIndex}`
    );

    // Creating the expected entity
    const expectedVehicleManagementVehicleRegistered: VehicleManagement_VehicleRegistered = {
      id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
      vehicleId: event.params.vehicleId,
      owner: event.params.owner,
      model: event.params.model,
    };
    // Asserting that the entity in the mock database is the same as the expected entity
    assert.deepEqual(actualVehicleManagementVehicleRegistered, expectedVehicleManagementVehicleRegistered, "Actual VehicleManagementVehicleRegistered should be the same as the expectedVehicleManagementVehicleRegistered");
  });
});
