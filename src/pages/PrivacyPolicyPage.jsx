import LegalLayout from '../components/LegalLayout'

const LAST_UPDATED = 'March 24, 2025'

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated={LAST_UPDATED}>
      <p>
        This Privacy Policy describes how Pact (&quot;we,&quot; &quot;us,&quot;
        or &quot;our&quot;) collects, uses, and shares information when you use
        our website at <a href="https://getpact.app">getpact.app</a> and the
        Pact iOS application (together, the &quot;Service&quot;). By using the
        Service, you agree to this policy. If you do not agree, please do not use
        the Service.
      </p>

      <h2>1. Information we collect</h2>
      <h3>1.1 Information you provide</h3>
      <ul>
        <li>
          <strong>Account data:</strong> such as email address, display name, or
          other profile details you choose to add when creating or managing an
          account.
        </li>
        <li>
          <strong>Team and activity data:</strong> such as team membership,
          goals or commitments you log, timestamps, and approval status within
          your team&apos;s workflow.
        </li>
        <li>
          <strong>Proof media:</strong> when you submit verification (for
          example, a live photo captured in-app), that uploaded media is stored
          in Google Firebase (such as Firebase Storage) so it can be reviewed by
          your team and managed according to this policy.
        </li>
        <li>
          <strong>Communications:</strong> if you email us (for example, for
          support), we receive the content of your message and associated
          metadata (such as your address and time sent).
        </li>
      </ul>

      <h3>1.2 Information collected automatically</h3>
      <ul>
        <li>
          <strong>Device and technical data:</strong> such as device type,
          operating system version, app version, and diagnostic logs that help us
          fix crashes or outages.
        </li>
        <li>
          <strong>Usage data:</strong> basic events needed to operate features
          (for example, that a review window opened or closed), where applicable.
        </li>
      </ul>

      <h3>1.3 Information we do not intend to collect</h3>
      <p>
        Pact is designed to use the camera for live capture rather than browsing
        your photo library. We do not sell your personal information. We do not
        use your data for third-party advertising.
      </p>

      <h2>2. How we use information</h2>
      <p>We use information to:</p>
      <ul>
        <li>Provide, maintain, and improve the Service.</li>
        <li>
          Show team-visible content to the members of your team during
          designated review or accountability windows.
        </li>
        <li>
          Enforce our <a href="/terms">Terms of Service</a> and protect users.
        </li>
        <li>
          Communicate with you about the Service, security, or policy updates.
        </li>
        <li>Comply with legal obligations and respond to lawful requests.</li>
      </ul>

      <h2>3. Legal bases (EEA, UK, Switzerland)</h2>
      <p>
        If you are in the European Economic Area, the UK, or Switzerland, we
        rely on: (a) performance of a contract with you; (b) our legitimate
        interests (for example, securing the Service and understanding crashes),
        except where overridden by your rights; and (c) consent where required
        (such as certain optional communications).
      </p>

      <h2>4. How we share information</h2>
      <ul>
        <li>
          <strong>With your team:</strong> content intended for accountability
          (such as proof submitted for peer review) may be visible to current
          members of your team according to product design.
        </li>
        <li>
          <strong>Service providers:</strong> we use trusted vendors to host
          data and run core infrastructure. User-uploaded data (including proof
          photos and related metadata) is stored in Google Firebase (including
          services such as Firebase Storage and database services) to operate
          the Service and make uploads available to authorized team members.
          Providers process information on our instructions and are contractually
          bound to appropriate protections where required.
        </li>
        <li>
          <strong>Legal and safety:</strong> we may disclose information if we
          believe in good faith that disclosure is required by law, to protect
          rights and safety, or to investigate abuse.
        </li>
        <li>
          <strong>Business transfers:</strong> if we are involved in a merger or
          asset sale, information may be transferred as part of that transaction,
          subject to standard confidentiality arrangements.
        </li>
      </ul>
      <p>We do not sell personal information as defined under U.S. state laws.</p>

      <h2>5. Retention</h2>
      <p>
        We retain information only as long as needed for the purposes above. For
        example, live proof photos used in daily review flows are intended to be
        deleted after the applicable approval window closes, and are not kept as
        a permanent personal gallery. Account data is retained until you delete
        your account or we delete inactive data according to our internal
        policies and legal obligations. Aggregated or de-identified data may be
        kept longer where permitted.
      </p>

      <h2>6. Security</h2>
      <p>
        We use administrative, technical, and organizational measures designed
        to protect information. No method of transmission or storage is 100%
        secure; we encourage strong passwords and device security.
      </p>

      <h2>7. App blocking and on-device settings</h2>
      <p>
        Optional distraction-blocking features may store configuration locally on
        your device using Apple-supported frameworks (such as ManagedSettings,
        where applicable). Pact does not receive the full contents of other apps you
        use; restrictions are enforced by the operating system on your device.
      </p>

      <h2>8. Your choices and rights</h2>
      <p>
        Depending on where you live, you may have rights to access, correct,
        delete, or port your personal data, or to object to or restrict certain
        processing. You may also have the right to lodge a complaint with a
        supervisory authority. To exercise rights, contact us at the email below.
        We may need to verify your request.
      </p>

      <h2>9. Children</h2>
      <p>
        The Service is not directed to children under 13 (or the age required by
        your jurisdiction). We do not knowingly collect personal information from
        children. If you believe we have, contact us and we will take appropriate
        steps to delete it.
      </p>

      <h2>10. International transfers</h2>
      <p>
        We may process information in the United States and other countries
        where we or our providers operate. Where required, we use appropriate
        safeguards (such as Standard Contractual Clauses) for transfers from the
        EEA, UK, or Switzerland.
      </p>

      <h2>11. Changes to this policy</h2>
      <p>
        We may update this Privacy Policy from time to time. We will post the
        new version on this page and change the &quot;Last updated&quot; date.
        For material changes, we may provide additional notice (for example, in
        the app or by email) where appropriate.
      </p>

      <h2>12. Contact us</h2>
      <p>
        Privacy questions or requests:{' '}
        <a href="mailto:yawsnr33@gmail.com">yawsnr33@gmail.com</a>
      </p>
    </LegalLayout>
  )
}
