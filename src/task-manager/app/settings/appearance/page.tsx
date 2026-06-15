import SettingsSection from "@/components/settings/settings-section";
import SettingsFieldRow from "@/components/settings/settings-field-row";
import {
  SettingButton,
  SettingSelect,
  SettingToggle,
} from "@/components/settings/settings-controls";

export default function AppearanceSettingsPage() {
  return (
    <SettingsSection
      eyebrow="Display"
      title="Appearance"
      description="Adjust theme, density, and accent preferences."
      footer={<SettingButton variant="primary">Save changes</SettingButton>}
    >
      <SettingsFieldRow
        label="Theme"
        description="Match the system or lock to a single mode."
      >
        <SettingSelect options={["System", "Light", "Dark"]} />
      </SettingsFieldRow>

      <SettingsFieldRow
        label="Density"
        description="Compact tightens spacing across lists and boards."
      >
        <SettingToggle label="Use compact density" enabled />
      </SettingsFieldRow>

      <SettingsFieldRow
        label="Accent color"
        description="Used for highlights, active states, and primary actions."
      >
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-8 w-8 rounded-md border border-[var(--border-color)] bg-[var(--accent)]"
          />
          <SettingSelect options={["Blue", "Violet", "Emerald", "Amber"]} />
        </div>
      </SettingsFieldRow>
    </SettingsSection>
  );
}
