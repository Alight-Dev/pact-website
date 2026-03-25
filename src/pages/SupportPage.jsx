import LegalLayout from '../components/LegalLayout'

const LAST_UPDATED = 'March 24, 2025'

export default function SupportPage() {
  return (
    <LegalLayout title="Support" lastUpdated={LAST_UPDATED}>
      <p>
        For questions, support requests, or account-related help, contact Pact
        support below. We respond to messages as soon as possible.
      </p>

      <h2>How to reach us</h2>
      <ul>
        <li>
          Email: <a href="mailto:yawsnr33@gmail.com">yawsnr33@gmail.com</a>
        </li>
      </ul>

      <h2>What you can request</h2>
      <ul>
        <li>Troubleshooting and app issues</li>
        <li>Privacy or data-related questions</li>
        <li>Questions about terms, teams, or account access</li>
        <li>Requests to delete or correct your account data</li>
      </ul>

      <h2>Response times</h2>
      <p>
        We typically reply within 1-2 business days. If your request is urgent,
        include the word “URGENT” in the subject line.
      </p>
    </LegalLayout>
  )
}

