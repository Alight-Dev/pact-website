import LegalLayout from '../components/LegalLayout'

const LAST_UPDATED = 'March 24, 2025'

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" lastUpdated={LAST_UPDATED}>
      <p>
        These Terms of Service (&quot;Terms&quot;) govern your use of Pact (the
        &quot;Service&quot;), including our website at{' '}
        <a href="https://getpact.app">getpact.app</a> and the Pact mobile
        application for iOS. By accessing or using the Service, you agree to
        these Terms. If you do not agree, do not use the Service.
      </p>

      <h2>1. The Service</h2>
      <p>
        Pact is a social accountability tool for small teams. It may help
        participants coordinate real-world goals, submit verification (such as
        live photos taken in-app), receive peer review from teammates, and use
        optional on-device controls (for example, app restrictions supported by
        Apple&apos;s APIs on compatible devices). Features may change over time
        as we improve the product.
      </p>

      <h2>2. Eligibility</h2>
      <p>
        You must be old enough to enter a binding contract where you live and
        meet any minimum age required by Apple&apos;s App Store terms and
        applicable law. If you use the Service on behalf of an organization,
        you represent that you have authority to bind that organization to these
        Terms.
      </p>

      <h2>3. Accounts and teams</h2>
      <p>
        You may need an account to use certain features. You agree to provide
        accurate information and to keep your credentials secure. Teams are
        self-selected groups: content you submit that is meant for team review
        may be visible to current members of your team according to how the
        product works. You are responsible for whom you invite and what you
        share.
      </p>

      <h2>4. User content and license</h2>
      <p>
        You retain rights to content you submit. You grant Pact a limited,
        worldwide, non-exclusive license to host, process, transmit, and display
        your content solely to operate, secure, and improve the Service — for
        example, to show proof to your teammates during a review window and to
        delete or remove it per our{' '}
        <a href="/privacy">Privacy Policy</a>. You represent that you have the
        rights needed to grant this license.
      </p>

      <h2>5. Acceptable use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Violate any law or infringe others&apos; rights.</li>
        <li>
          Harass, threaten, or harm other users, or share illegal, hateful, or
          exploitative material.
        </li>
        <li>
          Attempt to probe, scan, reverse engineer, or compromise the Service or
          other users&apos; accounts.
        </li>
        <li>
          Use automated means to access the Service in a way that burdens our
          systems without permission.
        </li>
        <li>Misrepresent your identity or affiliation.</li>
      </ul>

      <h2>6. Device permissions and app blocking</h2>
      <p>
        Some features rely on operating-system APIs (such as the camera or
        Screen Time–related controls on supported iOS versions). Those controls
        run on your device; Pact does not claim to bypass Apple platform rules.
        You are responsible for compatible hardware, OS versions, and any
        permissions you grant.
      </p>

      <h2>7. Third-party services</h2>
      <p>
        The Service may use infrastructure providers (for example, cloud
        hosting or authentication) as described in our Privacy Policy. Their use
        is subject to their terms and privacy practices.
      </p>

      <h2>8. Disclaimers</h2>
      <p>
        THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE.&quot;
        TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES,
        WHETHER EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A
        PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE
        SERVICE WILL BE UNINTERRUPTED OR ERROR-FREE, OR THAT APP BLOCKING OR
        ACCOUNTABILITY FEATURES WILL MEET YOUR NEEDS OR PREVENT ALL DISTRACTION.
      </p>

      <h2>9. Limitation of liability</h2>
      <p>
        TO THE MAXIMUM EXTENT PERMITTED BY LAW, PACT AND ITS AFFILIATES WILL NOT
        BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
        PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, DATA, GOODWILL, OR OTHER
        INTANGIBLE LOSSES, ARISING FROM YOUR USE OF THE SERVICE. OUR TOTAL
        LIABILITY FOR ANY CLAIM ARISING OUT OF THESE TERMS OR THE SERVICE IS
        LIMITED TO THE GREATER OF (A) THE AMOUNT YOU PAID US FOR THE SERVICE IN
        THE TWELVE MONTHS BEFORE THE CLAIM OR (B) FIFTY US DOLLARS (US $50), IF
        YOU HAVE NOT PAID US. SOME JURISDICTIONS DO NOT ALLOW CERTAIN LIMITATIONS;
        IN THOSE CASES, THESE LIMITS APPLY ONLY TO THE EXTENT ALLOWED BY LAW.
      </p>

      <h2>10. Indemnity</h2>
      <p>
        You will defend, indemnify, and hold harmless Pact and its affiliates,
        officers, and employees from any claims, damages, losses, or expenses
        (including reasonable attorneys&apos; fees) arising from your use of the
        Service, your content, or your violation of these Terms.
      </p>

      <h2>11. Termination</h2>
      <p>
        You may stop using the Service at any time. We may suspend or terminate
        access if you violate these Terms or if we need to for legal, security,
        or operational reasons. Provisions that should survive (including
        disclaimers, limitations, and indemnity) survive termination.
      </p>

      <h2>12. Changes</h2>
      <p>
        We may update the Service and these Terms. We will post the revised Terms
        on this page and update the &quot;Last updated&quot; date. Continued use
        after changes become effective constitutes acceptance of the revised
        Terms, to the extent permitted by law. If you do not agree, discontinue
        use of the Service.
      </p>

      <h2>13. Governing law and disputes</h2>
      <p>
        These Terms are governed by the laws of the United States and the State
        of Delaware, without regard to conflict-of-law rules, except where
        mandatory consumer protections in your country of residence require
        otherwise. Courts in Delaware have exclusive jurisdiction for disputes,
        unless applicable law requires a different venue.
      </p>

      <h2>14. Contact</h2>
      <p>
        Questions about these Terms:{' '}
        <a href="mailto:alightpact@gmail.com">alightpact@gmail.com</a>
      </p>
    </LegalLayout>
  )
}
