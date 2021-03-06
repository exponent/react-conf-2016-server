/**
 * @providesModule ScheduleType
 */

import {
  GraphQLObjectType,
} from 'graphql';

import CustomGraphQLDateType from 'graphql-custom-datetype';
import { globalIdField } from 'graphql-relay';

import createConnection from 'createConnection';
import ScheduleSlotType from 'ScheduleSlotType';
import * as ScheduleResolvers from 'ScheduleResolvers';
import { nodeInterface } from 'RelayNode';
import RelayRegistry from 'RelayRegistry';

const ScheduleType = new GraphQLObjectType({
  name: 'Schedule',

  fields: () => ({
    id: globalIdField('Schedule'),
    date: { type: CustomGraphQLDateType },
    slots: createConnection({
      type: ScheduleSlotType,
      resolver: ScheduleResolvers.slotsForScheduleResolver,
    }),
  }),

  interfaces: () => [nodeInterface],
});

RelayRegistry.registerResolverForType(ScheduleType, ScheduleResolvers.scheduleNodeResolver);
export default RelayRegistry.registerNodeType(ScheduleType);
