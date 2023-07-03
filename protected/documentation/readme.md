# Dynamic types

In the future we want to allow "anonymous" types to be passed in the data type.
The complex type resolver needs to be retrofitted to check if the "id" starts with a "<" and in that case try to unmarshal a structure definition.

This will allow a feed provider that for example allows running of SQL with dynamic result sets.

When registering a new data feed, we need to check the result type of the "dataPoint" array in the feed output. If it is still java.lang.Object (so no restriction etc), attempt to find a feedDataType describer instance, otherwise use the id we find there.