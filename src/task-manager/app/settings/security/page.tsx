import SettingsSection from "@/components/settings/settings-section";
import SettingsFieldRow from "@/components/settings/settings-field-row";
import {
  SettingButton,
  SettingTextField,
  SettingToggle,
} from "@/components/settings/settings-controls";

const activeSessions = [
  { device: "MacBook Pro · Chrome", location: "Seattle, US", current: true },
  { device: "iPhone 15 · Safari", location: "Seattle, US", current: false },
];

export default function SecuritySettingsPage() {
  return (
    <SettingsSection
      eyebrow="Protection"
      title="Security"
      description="Manage your password, two-factor, and active sessions."
      footer={<SettingButton variant="primary">Save changes</SettingButton>}
    >
      <SettingsFieldRow
        label="Password"
        description="Used together with two-factor to sign in."
        hint="Last changed 3 months ago."
      >
        <SettingTextField type="password" placeholder="••••••••••" />
      </SettingsFieldRow>

      <SettingsFieldRow
        label="Two-factor authentication"
        description="Require a second step when signing in."
        badge="Recommended"
      >
        <SettingToggle label="Enable two-factor authentication" />
      </SettingsFieldRow>

      <SettingsFieldRow
        label="Active sessions"
        description="Devices currently signed in to your account."
      >
        <ul className="flex flex-col gap-2">
          {activeSessions.map((session) => (
            <li
              key={session.device}
              className="flex items-center justify-between gap-3 rounded-md border border-[var(--border-color)] bg-[var(--surface)] px-3 py-2 text-sm"
            >
              <span className="min-w-0">
                <span className="block truncate font-medium text-[var(--foreground)]">
                  {session.device}
                </span>
                <span className="block text-xs text-[var(--muted)]">
                  {session.location}
                </span>
              </span>
              {session.current ? (
                <span className="shrink-0 rounded-full border border-[var(--border-color)] px-2 py-0.5 text-[11px] font-semibold text-[var(--muted)]">
                  This device
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      </SettingsFieldRow>

      <SettingsFieldRow
        label="Delete account"
        description="Permanently remove your account and all of its data."
        badge="Danger"
      >
        <div>
          <SettingButton variant="danger">Delete account</SettingButton>
        </div>
      </SettingsFieldRow>
    </SettingsSection>
  );
}
