export class CounterService {
  activeToInactiveCount = 0;
  inactiveToActiveCount = 0;

  incrementActiveToInactive() {
    this.activeToInactiveCount++;
    console.log("Active to Inactive: " + this.activeToInactiveCount);
  }

  incrementInactiveToActive() {
    this.inactiveToActiveCount++;
    console.log("Inactive to Active: " + this.inactiveToActiveCount);
  }
}
