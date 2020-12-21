---
title: Why Review Code?
date: 2020-12-19T17:35:00
description: Why is it valuable to review code?
tags: ["craft", "advent of code", "aoc2020", "programming", "go"]
---

[sophie alpert's post]: https://sophiebits.com/2018/12/25/why-review-code.html
[sharadh krishnamurthy's post]: https://www.nerdwallet.com/blog/engineering/mindful-pr-reviews/
[differential]: https://www.phacility.com/phabricator/differential/
[pr to add a feature]: https://github.com/terraform-providers/terraform-provider-aws/pull/11459
[reviewing earlier in the development of a change]: https://secure.phabricator.com/phame/post/view/766/write_review_merge_publish_phabricator_review_workflow/

Recently, I read [Sophie Alpert's post] on code review. It resonated with me.
Similar to her experience, I learned how to review code from working at Google
and I agree with Sophie's assessment: on changing her team's process to review
code, "it was a great decision," she writes. I'm in 100% agreement of the nine points on her bullet list of the benefits of code review.

My friend [Sharadh Krishnamurthy's post] on mindfulness in code review also
resonates with my personal style. However, I go back and forth on this, because
communications and cultures vary wildly and I have seen groups with curt comms
not suffer lack of trust or hurt feelings because of them.

I wanted to list some of the ways I have seen code-review go wrong:

1. **Massive dump** code review. I regularly see senior developers dump huge
   code reviews with several thousand lines of delta and pages of description on
   their juniors. The juniors spend days reviewing, maybe add a few comments
   here or there, approve, and then the code goes to production and all hell
   breaks lose. This makes me appreciate that [Differential] focuses on
   [reviewing earlier in the development of a change] with the expectation of
   frequent iteration. Yet, GitHub is fully adequate for this. It is easy to
   publish a branch and begin code review in a draft. But, if imposing the
   burden of making developers seek review earlier forces them to **optimize for
   the reviewer**, it could be worth it to switch tools.

1. **Don't call us, we'll call you** code review. Poor turnaround time can cause
   you to miss your deliverable deadline. Imagine you're working with an
   open-source GitHub project (not to name names, but it's HashiCorp Terraform)
   and you send a [PR to add a feature]. That PR has been waiting on code review for a year
   and there have been no comments from HashiCorp on why that PR has not been
   reviewed yet. It's small. The author rebases his PR every few weeks and pings
   the PR for review to deafening silence. The problem here isn't code-review
   per-se, but even on a smaller scale, without _measuring the amount of time
   code waits in review_ and making that metric an SLI of your _software
   development life-cycle_, code-review can destroy engineering's ability to
   deliver (or put out a dumpster fire).

1. **Poor or irrelevant** code review. Human reviewers can use code-review as a
   soap-box for irrelevant pet concerns like premature optimization. Or in the
   reverse, without style guides, code authors refusing to make changes for
   readability or other legitimate concerns. To prevent these situations,
   engineering teams must have shared high standards for code review.
   Engineering leaders must prioritize documenting what matters in code review,
   code style guides, common code review feedback, and measuring code review
   performance throughout the organization. Golang makes a good example of doing
   this all-in on the GitHub platform:
   - [Go Code Review Basics](https://github.com/golang/go/wiki/CodeReview)
   - [Common Code Review Comments](https://github.com/golang/go/wiki/CodeReviewComments)
   - [Go Project Commit Messages](https://github.com/golang/go/wiki/CommitMessage)
