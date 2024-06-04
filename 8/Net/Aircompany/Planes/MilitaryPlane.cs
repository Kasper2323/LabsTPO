using Aircompany.Models;
using System.Runtime.InteropServices;

namespace Aircompany.Planes
{
    public class MilitaryPlane : Plane
    {
        public readonly MilitaryType type;
        public MilitaryType Type => type;

        public MilitaryPlane(string model, int maxSpeed, int maxFlightDistance, int maxLoadCapacity, MilitaryType type)
            : base(model, maxSpeed, maxFlightDistance, maxLoadCapacity)
        {
            this.type = type;
        }

        public override bool Equals(object obj)
        {
            return obj is MilitaryPlane plane && base.Equals(obj) && type == plane.type;
        }

        public override int GetHashCode()
        {
            var hashCode = 1701194404;
            hashCode = hashCode * -1521134295 + base.GetHashCode();
            hashCode = hashCode * -1521134295 + type.GetHashCode();
            return hashCode;
        }
        public override string ToString()
        {
            return base.ToString() + $", type={type}";
        }        
    }
}
