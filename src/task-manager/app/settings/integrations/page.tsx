import SettingsSection from "@/components/settings/settings-section";
import SettingsFieldRow from "@/components/settings/settings-field-row";
import { SettingButton } from "@/components/settings/settings-controls";

const integrations = [
  {
    name: "Slack",
    detail: "Post task updates and blockers to a channel.",
    connected: true,
  },
  {
    name: "GitHub",
    detail: "Link pull requests to tasks automatically.",
    connected: true,
  },
  {
    name: "Figma",
    detail: "Attach design files to project work.",
    connected: false,
  },
  {
    name: "Google Calendar",
    detail: "Sync due dates with your calendar.",
    connected: false,
  },
];

export default function IntegrationsSettingsPage() {
  return (
    <SettingsSection
      eyebrow="Connections"
      title="Integrations"
      description="Connect the tools your team uses to plan and ship work."
    >
      {integrations.map((integration) => (
        <SettingsFieldRow
          key={integration.name}
          label={integration.name}
          description={integration.detail}
          badge={integration.connected ? "Connected" : undefined}
        >
          <div>
            {integration.connected ? (
              <SettingButton variant="secondary">Manage</SettingButton>
            ) : (
              <SettingButton variant="primary">Connect</SettingButton>
            )}
          </div>
        </SettingsFieldRow>
      ))}
    </SettingsSection>
  );
}
