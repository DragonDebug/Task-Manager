import SettingsSection from "@/components/settings/settings-section";
import SettingsFieldRow from "@/components/settings/settings-field-row";
import {
  SettingButton,
  SettingTextArea,
  SettingTextField,
} from "@/components/settings/settings-controls";

export default function ProfileSettingsPage() {
  return (
    <SettingsSection
      eyebrow="Account"
      title="Profile"
      description="How you show up across tasks, comments, and assignments."
      badge="Visible to team"
      footer={<SettingButton variant="primary">Save changes</SettingButton>}
    >
      <SettingsFieldRow
        label="Full name"
        description="Your display name on activity, mentions, and reviews."
      >
        <SettingTextField placeholder="Jordan Avery" />
      </SettingsFieldRow>

      <SettingsFieldRow
        label="Handle"
        description="A unique identifier used for @mentions."
        hint="Letters, numbers, and dashes only."
      >
        <SettingTextField placeholder="jordan-avery" />
      </SettingsFieldRow>

      <SettingsFieldRow
        label="Role"
        description="Shown next to your name on the team roster."
      >
        <SettingTextField placeholder="Product Lead" />
      </SettingsFieldRow>

      <SettingsFieldRow
        label="Bio"
        description="A short blurb about what you focus on."
        badge="Optional"
      >
        <SettingTextArea placeholder="Coordinating delivery across squads." />
      </SettingsFieldRow>
    </SettingsSection>
  );
}
