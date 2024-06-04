using System.Collections.Generic;
using System.Runtime.InteropServices;

namespace Aircompany.Planes
{
    public abstract class Plane
    {
        private string model;
        private int maxSpeed;
        private int maxFlightDistance;
        private int maxLoadCapacity;

        public string Model => model;
        public int MaxSpeed => maxSpeed;
        public int MaxFlightDistance => maxFlightDistance;
        public int MaxLoadCapacity => maxLoadCapacity;

        public Plane(string model, int maxSpeed, int maxFlightDistance, int maxLoadCapacity)
        {
            this.model = model;
            this.maxSpeed = maxSpeed;
            this.maxFlightDistance = maxFlightDistance;
            this.maxLoadCapacity = maxLoadCapacity;
        }

        public override string ToString()
        {
            return $"Plane{{model='{model}', maxSpeed={maxSpeed}, maxFlightDistance={maxFlightDistance}, maxLoadCapacity={maxLoadCapacity}}}";
        }

        public override bool Equals(object obj)
        {
            return obj is Plane plane &&
                   model == plane.model &&
                   maxSpeed == plane.maxSpeed &&
                   maxFlightDistance == plane.maxFlightDistance &&
                   maxLoadCapacity == plane.maxLoadCapacity;
        }

        public override int GetHashCode()
        {
            var hashCode = -1043886837;
            hashCode = hashCode * -1521134295 + EqualityComparer<string>.Default.GetHashCode(model);
            hashCode = hashCode * -1521134295 + maxSpeed.GetHashCode();
            hashCode = hashCode * -1521134295 + maxFlightDistance.GetHashCode();
            hashCode = hashCode * -1521134295 + maxLoadCapacity.GetHashCode();
            return hashCode;
        }        

    }
}
