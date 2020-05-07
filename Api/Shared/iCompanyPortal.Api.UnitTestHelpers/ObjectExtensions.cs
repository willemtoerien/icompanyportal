using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace System
{
    public static class ObjectExtensions
    {
        public static T SetStringProperties<T>(this T @object)
        {
            var properties = typeof(T).GetProperties()
                .Where(x => x.PropertyType == typeof(string));
            foreach (var property in properties)
            {
                property.SetValue(@object, property.Name);
            }
            return @object;
        }
    }
}
