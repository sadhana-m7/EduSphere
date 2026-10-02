export type ClaimStatus = 'supported' | 'review' | 'contradiction'
export type Confidence = 'Low' | 'Medium' | 'High'

export type EvidenceSource = {
  id: string
  name: string
  url: string
  kind: 'Documentation' | 'Textbook' | 'Standard' | 'Journal' | 'Course'
}

export type VerifiedClaim = {
  claim: string
  status: ClaimStatus
  note: string
  sourceIds: string[]
}

export type VerificationReport = {
  confidence: Confidence
  lastChecked: string
  claims: VerifiedClaim[]
  sources: EvidenceSource[]
  communityReviews: number
}

export const COMMUNITY_VERIFIED_THRESHOLD = 3

export const VERIFICATION_REPORTS: Record<string, VerificationReport> = {
  r1: {
    confidence: 'High',
    lastChecked: 'Sep 24, 2026',
    communityReviews: 7,
    sources: [
      { id: 'clrs', name: 'Cormen et al., Introduction to Algorithms (4th ed.)', url: 'https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/', kind: 'Textbook' },
      { id: 'mit6006', name: 'MIT OCW 6.006 Introduction to Algorithms', url: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/', kind: 'Course' },
      { id: 'acm', name: 'ACM/IEEE CS2023 Curricula', url: 'https://csed.acm.org/', kind: 'Standard' },
    ],
    claims: [
      { claim: 'Binary heap insertion runs in O(log n) time.', status: 'supported', note: 'Matches the standard sift-up analysis.', sourceIds: ['clrs', 'mit6006'] },
      { claim: 'Building a heap from n elements takes O(n) time.', status: 'supported', note: 'The bottom-up build-heap bound is well established.', sourceIds: ['clrs'] },
      { claim: 'Merge sort is stable and runs in O(n log n) in all cases.', status: 'supported', note: 'Consistent with reference texts.', sourceIds: ['clrs', 'mit6006'] },
      { claim: 'Quicksort worst case is O(n²).', status: 'supported', note: 'Occurs with consistently poor pivot choices.', sourceIds: ['clrs'] },
      { claim: 'Hash table lookups are always O(1).', status: 'review', note: 'O(1) is the expected case; worst case can be O(n). Wording may overstate the guarantee.', sourceIds: ['clrs', 'mit6006'] },
      { claim: "Dijkstra's algorithm handles graphs with non-negative edge weights.", status: 'supported', note: 'Correct; negative weights require Bellman–Ford.', sourceIds: ['clrs'] },
      { claim: 'AVL trees keep height within O(log n).', status: 'supported', note: 'Matches balanced BST theory.', sourceIds: ['clrs', 'mit6006'] },
      { claim: 'Topics map to the CS2023 Algorithms knowledge area.', status: 'supported', note: 'Coverage aligns with the AL knowledge area outline.', sourceIds: ['acm'] },
    ],
  },
  r2: {
    confidence: 'Medium',
    lastChecked: 'Sep 20, 2026',
    communityReviews: 1,
    sources: [
      { id: 'pydocs', name: 'Python 3 Official Documentation', url: 'https://docs.python.org/3/', kind: 'Documentation' },
      { id: 'pep3105', name: 'PEP 3105 – Make print a function', url: 'https://peps.python.org/pep-3105/', kind: 'Standard' },
      { id: 'py2eol', name: 'Sunsetting Python 2 (python.org)', url: 'https://www.python.org/doc/sunset-python-2/', kind: 'Documentation' },
    ],
    claims: [
      { claim: 'Use `print "Hello"` to write output.', status: 'contradiction', note: 'Python 3 requires print() as a function. This syntax raises a SyntaxError.', sourceIds: ['pep3105', 'pydocs'] },
      { claim: 'Integer division `5 / 2` returns 2.', status: 'contradiction', note: 'In Python 3, `/` returns 2.5; floor division uses `//`.', sourceIds: ['pydocs'] },
      { claim: 'Python 2 is the recommended version for beginners.', status: 'contradiction', note: 'Python 2 reached end of life on Jan 1, 2020.', sourceIds: ['py2eol'] },
      { claim: 'Lists are mutable, tuples are immutable.', status: 'supported', note: 'Still accurate in Python 3.', sourceIds: ['pydocs'] },
      { claim: 'Indentation defines code blocks.', status: 'supported', note: 'Unchanged across versions.', sourceIds: ['pydocs'] },
      { claim: '`raw_input()` reads user input as a string.', status: 'review', note: 'Renamed to input() in Python 3. Correct only for legacy code.', sourceIds: ['pydocs'] },
    ],
  },
  r3: {
    confidence: 'High',
    lastChecked: 'Sep 22, 2026',
    communityReviews: 4,
    sources: [
      { id: 'strang', name: 'Strang, Introduction to Linear Algebra (6th ed.)', url: 'https://math.mit.edu/~gs/linearalgebra/', kind: 'Textbook' },
      { id: 'mit1806', name: 'MIT OCW 18.06 Linear Algebra', url: 'https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/', kind: 'Course' },
      { id: 'mml', name: 'Deisenroth et al., Mathematics for Machine Learning', url: 'https://mml-book.github.io/', kind: 'Textbook' },
    ],
    claims: [
      { claim: 'Every real matrix has a singular value decomposition.', status: 'supported', note: 'A fundamental theorem of linear algebra.', sourceIds: ['strang', 'mml'] },
      { claim: 'Eigenvectors of a symmetric matrix are orthogonal.', status: 'supported', note: 'For distinct eigenvalues; orthogonal bases always exist.', sourceIds: ['strang', 'mit1806'] },
      { claim: 'PCA uses the eigenvectors of the covariance matrix.', status: 'supported', note: 'Standard formulation.', sourceIds: ['mml'] },
      { claim: 'Every square matrix is diagonalizable.', status: 'review', note: 'Not true in general — defective matrices exist. Slide 14 may need a qualifier.', sourceIds: ['strang', 'mit1806'] },
      { claim: 'Matrix multiplication is not commutative.', status: 'supported', note: 'Correct in general.', sourceIds: ['strang'] },
    ],
  },
  r4: {
    confidence: 'Medium',
    lastChecked: 'Sep 18, 2026',
    communityReviews: 3,
    sources: [
      { id: 'nng', name: 'Nielsen Norman Group – 10 Usability Heuristics', url: 'https://www.nngroup.com/articles/ten-usability-heuristics/', kind: 'Journal' },
      { id: 'wcag', name: 'W3C WCAG 2.2', url: 'https://www.w3.org/TR/WCAG22/', kind: 'Standard' },
      { id: 'ixdf', name: 'Interaction Design Foundation', url: 'https://www.interaction-design.org/', kind: 'Course' },
    ],
    claims: [
      { claim: 'Body text needs a contrast ratio of at least 4.5:1 (AA).', status: 'supported', note: 'Matches WCAG success criterion 1.4.3.', sourceIds: ['wcag'] },
      { claim: 'Testing with 5 users uncovers about 85% of usability problems.', status: 'review', note: 'A widely cited heuristic from specific conditions; later studies show wide variance.', sourceIds: ['nng'] },
      { claim: 'Visual hierarchy guides attention through size, color and spacing.', status: 'supported', note: 'Consistent with design literature.', sourceIds: ['ixdf'] },
      { claim: 'Recognition is easier than recall for users.', status: 'supported', note: 'One of the Nielsen heuristics.', sourceIds: ['nng'] },
    ],
  },
  r5: {
    confidence: 'Low',
    lastChecked: 'Sep 12, 2026',
    communityReviews: 2,
    sources: [
      { id: 'hibbeler', name: 'Hibbeler, Structural Analysis (10th ed.)', url: 'https://www.pearson.com/en-us/subject-catalog/p/structural-analysis/P200000003393', kind: 'Textbook' },
      { id: 'ec2', name: 'EN 1992 Eurocode 2 (EU Science Hub)', url: 'https://eurocodes.jrc.ec.europa.eu/EN-Eurocodes/eurocode-2-design-concrete-structures', kind: 'Standard' },
    ],
    claims: [
      { claim: 'A truss member carries only axial force under joint loading.', status: 'supported', note: 'Standard ideal-truss assumption.', sourceIds: ['hibbeler'] },
      { claim: 'The method of joints solves statically determinate trusses.', status: 'supported', note: 'Consistent with reference texts.', sourceIds: ['hibbeler'] },
      { claim: 'Partial safety factor for concrete is 1.5 per Eurocode 2.', status: 'review', note: 'Value is common but depends on design situation and National Annex; the second-generation revision may affect it.', sourceIds: ['ec2'] },
      { claim: 'Minimum reinforcement clauses follow EN 1992-1-1:2004.', status: 'review', note: 'A revised edition exists. Clause references could not be confirmed against the current text.', sourceIds: ['ec2'] },
      { claim: 'Max beam deflection under UDL is 5wL⁴/384EI.', status: 'supported', note: 'For a simply supported beam — the context in the resource matches.', sourceIds: ['hibbeler'] },
    ],
  },
  r6: {
    confidence: 'High',
    lastChecked: 'Sep 21, 2026',
    communityReviews: 5,
    sources: [
      { id: 'openintro', name: 'OpenIntro Statistics (4th ed.)', url: 'https://www.openintro.org/book/os/', kind: 'Textbook' },
      { id: 'asa', name: 'ASA Statement on p-Values (2016)', url: 'https://www.tandfonline.com/doi/full/10.1080/00031305.2016.1154108', kind: 'Journal' },
    ],
    claims: [
      { claim: 'A p-value is the probability that the null hypothesis is true.', status: 'contradiction', note: 'Common misinterpretation. A p-value is the probability of data at least this extreme, assuming the null is true.', sourceIds: ['asa', 'openintro'] },
      { claim: 'The Central Limit Theorem applies to sample means for large n.', status: 'supported', note: 'Given finite variance.', sourceIds: ['openintro'] },
      { claim: 'Correlation does not imply causation.', status: 'supported', note: 'Consistent with reference texts.', sourceIds: ['openintro'] },
      { claim: 'A 95% CI contains the true parameter in 95% of repeated samples.', status: 'supported', note: 'Correct frequentist interpretation.', sourceIds: ['openintro'] },
      { claim: 'Type I error is rejecting a true null hypothesis.', status: 'supported', note: 'Standard definition.', sourceIds: ['openintro'] },
    ],
  },
}

export function summarize(report: VerificationReport) {
  const count = (s: ClaimStatus) => report.claims.filter((c) => c.status === s).length
  return {
    analyzed: report.claims.length,
    supported: count('supported'),
    review: count('review'),
    contradictions: count('contradiction'),
  }
}
