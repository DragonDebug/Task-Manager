import SettingsSection from "@/components/settings/settings-section";
import SettingsFieldRow from "@/components/settings/settings-field-row";
import {
  SettingButton,
  SettingSelect,
  SettingToggle,
} from "@/components/settings/settings-controls";

export default function NotificationsSettingsPage() {
  return (
    <SettingsSection
      eyebrow="Alerts"
      title="Notifications"
      description="Tune summaries for due dates, blockers, and assignments."
      footer={<SettingButton variant="primary">Save changes</SettingButton>}
    >
      <SettingsFieldRow
        label="Due dates"
        description="Reminders as deadlines approach."
      >
        <SettingToggle label="Notify me about upcoming due dates" enabled />
      </SettingsFieldRow>

      <SettingsFieldRow
        label="Blockers"
        description="Alerts when work you own becomes blocked."
      >
        <SettingToggle label="Notify me about new blockers" enabled />
      </SettingsFieldRow>

      <SettingsFieldRow
        label="Assignments"
        description="Pings when a task is assigned to you."
      >
        <SettingToggle label="Notify me about new assignments" />
      </SettingsFieldRow>

      <SettingsFieldRow
        label="Digest frequency"
        description="How often summary emails are delivered."
      >
        <SettingSelect options={["Real-time", "Daily", "Weekly"]} />
      </SettingsFieldRow>
    </SettingsSection>
  );
}
