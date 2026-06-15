import SettingsSection from "@/components/settings/settings-section";
import SettingsFieldRow from "@/components/settings/settings-field-row";
import {
  SettingButton,
  SettingSelect,
  SettingTextField,
} from "@/components/settings/settings-controls";

export default function WorkspaceSettingsPage() {
  return (
    <SettingsSection
      eyebrow="Defaults"
      title="Workspace"
      description="Control naming, intake rules, and review cadence."
      footer={<SettingButton variant="primary">Save changes</SettingButton>}
    >
      <SettingsFieldRow
        label="Workspace name"
        description="Appears in the navigation header and shared links."
      >
        <SettingTextField placeholder="Delivery Team" />
      </SettingsFieldRow>

      <SettingsFieldRow
        label="Default project"
        description="New tasks land here unless another project is chosen."
      >
        <SettingSelect
          options={[
            "Platform refresh",
            "Executive dashboard",
            "Support automation",
          ]}
        />
      </SettingsFieldRow>

      <SettingsFieldRow
        label="Intake rule"
        description="How incoming work is triaged before it reaches a board."
      >
        <SettingSelect
          options={["Manual review", "Auto-assign by area", "Round robin"]}
        />
      </SettingsFieldRow>

      <SettingsFieldRow
        label="Review cadence"
        description="How often the team revisits in-flight work."
      >
        <SettingSelect options={["Daily", "Weekly", "Biweekly"]} />
      </SettingsFieldRow>
    </SettingsSection>
  );
}
