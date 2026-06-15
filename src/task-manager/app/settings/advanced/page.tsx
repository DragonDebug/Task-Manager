import SettingsSection from "@/components/settings/settings-section";
import SettingsFieldRow from "@/components/settings/settings-field-row";
import {
  SettingButton,
  SettingTextField,
} from "@/components/settings/settings-controls";

export default function AdvancedSettingsPage() {
  return (
    <SettingsSection
      eyebrow="Power tools"
      title="Advanced"
      description="API access, data export, and destructive actions."
    >
      <SettingsFieldRow
        label="API token"
        description="Use this token to authenticate programmatic access."
        badge="Keep secret"
      >
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <SettingTextField defaultValue="tm_live_••••••••••••" />
          <SettingButton variant="secondary">Regenerate</SettingButton>
        </div>
      </SettingsFieldRow>

      <SettingsFieldRow
        label="Export data"
        description="Download a copy of your tasks and projects."
      >
        <div>
          <SettingButton variant="secondary">Request export</SettingButton>
        </div>
      </SettingsFieldRow>

      <SettingsFieldRow
        label="Reset workspace"
        description="Remove all tasks, projects, and settings for this workspace."
        badge="Danger"
      >
        <div>
          <SettingButton variant="danger">Reset workspace</SettingButton>
        </div>
      </SettingsFieldRow>
    </SettingsSection>
  );
}
