import LegalLayout from '../components/LegalLayout'

const LAST_UPDATED = 'March 24, 2025'

export default function MarketingPage() {
  return (
    <LegalLayout title="About Pact" lastUpdated={LAST_UPDATED}>
      <p>
        Pact is an iOS app for small, self-selected teams that want to turn
        “I’ll do it tomorrow” into real accountability. You and your teammates
        set shared goals, submit proof of progress, and unlock your day through
        your team’s review.
      </p>

      <h2>What Pact helps you do</h2>
      <ul>
        <li>Lock distracting apps each morning until your team completes goals</li>
        <li>Submit real-world proof (e.g., live photo verification)</li>
        <li>Get peer review from your teammates during a daily window</li>
        <li>Build trust through consistent, time-bounded accountability</li>
      </ul>

      <h2>Privacy-first by design</h2>
      <p>
        Pact is built around trust within your team. We do not use your data
        for advertising or sell personal information. Uploaded proof media is
        stored in Google Firebase so it can be reviewed by authorized team
        members.
      </p>

      <h2>Learn more</h2>
      <p>
        Read our <a href="/privacy">Privacy Policy</a> and{' '}
        <a href="/terms">Terms of Service</a>, or view{' '}
        <a href="/support">Support</a> for help.
      </p>
    </LegalLayout>
  )
}

