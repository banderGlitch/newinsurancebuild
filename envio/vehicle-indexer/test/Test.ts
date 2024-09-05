import assert from "assert";
import { 
  TestHelpers,
  VehicleManagement_OwnershipTransferred
} from "generated";
const { MockDb, VehicleManagement } = TestHelpers;

describe("VehicleManagement contract OwnershipTransferred event tests", () => {
  // Create mock db
  const mockDb = MockDb.createMockDb();

  // Creating mock for VehicleManagement contract OwnershipTransferred event
  const event = VehicleManagement.OwnershipTransferred.createMockEvent({/* It mocks event fields with default values. You can overwrite them if you need */});

  it("VehicleManagement_OwnershipTransferred is created correctly", async () => {
    // Processing the event
    const mockDbUpdated = await VehicleManagement.OwnershipTransferred.processEvent({
      event,
      mockDb,
    });

    // Getting the actual entity from the mock database
    let actualVehicleManagementOwnershipTransferred = mockDbUpdated.entities.VehicleManagement_OwnershipTransferred.get(
      `${event.chainId}_${event.block.number}_${event.logIndex}`
    );

    // Creating the expected entity
    const expectedVehicleManagementOwnershipTransferred: VehicleManagement_OwnershipTransferred = {
      id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
      previousOwner: event.params.previousOwner,
      newOwner: event.params.newOwner,
    };
    // Asserting that the entity in the mock database is the same as the expected entity
    assert.deepEqual(actualVehicleManagementOwnershipTransferred, expectedVehicleManagementOwnershipTransferred, "Actual VehicleManagementOwnershipTransferred should be the same as the expectedVehicleManagementOwnershipTransferred");
  });
});
