import { Relation } from 'src/engine/workspace-manager/workspace-sync-metadata/interfaces/relation.interface';

import { FieldMetadataType } from 'src/engine/metadata-modules/field-metadata/field-metadata.entity';
import { CALENDAR_EVENT_PARTICIPANT_STANDARD_FIELD_IDS } from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-field-ids';
import { STANDARD_OBJECT_IDS } from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-object-ids';
import { CalendarEventObjectMetadata } from 'src/modules/calendar/standard-objects/calendar-event.object-metadata';
import { PersonObjectMetadata } from 'src/modules/person/standard-objects/person.object-metadata';
import { WorkspaceMemberObjectMetadata } from 'src/modules/workspace-member/standard-objects/workspace-member.object-metadata';
import { BaseWorkspaceEntity } from 'src/engine/twenty-orm/base.workspace-entity';
import { WorkspaceEntity } from 'src/engine/twenty-orm/decorators/workspace-object.decorator';
import { WorkspaceIsSystem } from 'src/engine/twenty-orm/decorators/workspace-is-system.decorator';
import { WorkspaceIsNotAuditLogged } from 'src/engine/twenty-orm/decorators/workspace-is-not-audit-logged.decorator';
import { WorkspaceField } from 'src/engine/twenty-orm/decorators/workspace-field.decorator';
import { WorkspaceRelation } from 'src/engine/twenty-orm/decorators/workspace-relation.decorator';
import { RelationMetadataType } from 'src/engine/metadata-modules/relation-metadata/relation-metadata.entity';
import { WorkspaceIsNullable } from 'src/engine/twenty-orm/decorators/workspace-is-nullable.decorator';

export enum CalendarEventParticipantResponseStatus {
  NEEDS_ACTION = 'NEEDS_ACTION',
  DECLINED = 'DECLINED',
  TENTATIVE = 'TENTATIVE',
  ACCEPTED = 'ACCEPTED',
}

@WorkspaceEntity({
  standardId: STANDARD_OBJECT_IDS.calendarEventParticipant,
  namePlural: 'calendarEventParticipants',
  labelSingular: 'Calendar event participant',
  labelPlural: 'Calendar event participants',
  description: 'Calendar event participants',
  icon: 'IconCalendar',
})
@WorkspaceIsSystem()
@WorkspaceIsNotAuditLogged()
export class CalendarEventParticipantObjectMetadata extends BaseWorkspaceEntity {
  @WorkspaceField({
    standardId: CALENDAR_EVENT_PARTICIPANT_STANDARD_FIELD_IDS.handle,
    type: FieldMetadataType.TEXT,
    label: 'Handle',
    description: 'Handle',
    icon: 'IconMail',
  })
  handle: string;

  @WorkspaceField({
    standardId: CALENDAR_EVENT_PARTICIPANT_STANDARD_FIELD_IDS.displayName,
    type: FieldMetadataType.TEXT,
    label: 'Display Name',
    description: 'Display Name',
    icon: 'IconUser',
  })
  displayName: string;

  @WorkspaceField({
    standardId: CALENDAR_EVENT_PARTICIPANT_STANDARD_FIELD_IDS.isOrganizer,
    type: FieldMetadataType.BOOLEAN,
    label: 'Is Organizer',
    description: 'Is Organizer',
    icon: 'IconUser',
    defaultValue: false,
  })
  isOrganizer: boolean;

  @WorkspaceField({
    standardId: CALENDAR_EVENT_PARTICIPANT_STANDARD_FIELD_IDS.responseStatus,
    type: FieldMetadataType.SELECT,
    label: 'Response Status',
    description: 'Response Status',
    icon: 'IconUser',
    options: [
      {
        value: CalendarEventParticipantResponseStatus.NEEDS_ACTION,
        label: 'Needs Action',
        position: 0,
        color: 'orange',
      },
      {
        value: CalendarEventParticipantResponseStatus.DECLINED,
        label: 'Declined',
        position: 1,
        color: 'red',
      },
      {
        value: CalendarEventParticipantResponseStatus.TENTATIVE,
        label: 'Tentative',
        position: 2,
        color: 'yellow',
      },
      {
        value: CalendarEventParticipantResponseStatus.ACCEPTED,
        label: 'Accepted',
        position: 3,
        color: 'green',
      },
    ],
    defaultValue: `'${CalendarEventParticipantResponseStatus.NEEDS_ACTION}'`,
  })
  responseStatus: string;

  @WorkspaceRelation({
    standardId: CALENDAR_EVENT_PARTICIPANT_STANDARD_FIELD_IDS.calendarEvent,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Event ID',
    description: 'Event ID',
    icon: 'IconCalendar',
    joinColumn: 'calendarEventId',
    inverseSideTarget: () => CalendarEventObjectMetadata,
    inverseSideFieldKey: 'calendarEventParticipants',
  })
  calendarEvent: Relation<CalendarEventObjectMetadata>;

  @WorkspaceRelation({
    standardId: CALENDAR_EVENT_PARTICIPANT_STANDARD_FIELD_IDS.person,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Person',
    description: 'Person',
    icon: 'IconUser',
    joinColumn: 'personId',
    inverseSideTarget: () => PersonObjectMetadata,
    inverseSideFieldKey: 'calendarEventParticipants',
  })
  @WorkspaceIsNullable()
  person: Relation<PersonObjectMetadata>;

  @WorkspaceRelation({
    standardId: CALENDAR_EVENT_PARTICIPANT_STANDARD_FIELD_IDS.workspaceMember,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Workspace Member',
    description: 'Workspace Member',
    icon: 'IconUser',
    joinColumn: 'workspaceMemberId',
    inverseSideTarget: () => WorkspaceMemberObjectMetadata,
    inverseSideFieldKey: 'calendarEventParticipants',
  })
  @WorkspaceIsNullable()
  workspaceMember: Relation<WorkspaceMemberObjectMetadata>;
}
