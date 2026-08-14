#!/bin/bash
echo '/// <reference types="vite/client" />' > src/vite-env.d.ts

# Fix HowItWorks.tsx
sed -i '8d' src/components/home/HowItWorks.tsx

# Fix TwoJourneys.tsx
sed -i '8d' src/components/home/TwoJourneys.tsx

# Fix WhyElKairon.tsx
sed -i '7d' src/components/home/WhyElKairon.tsx

# Fix WhyGermany.tsx
sed -i '6d; 9d' src/components/home/WhyGermany.tsx

# Fix Globe.tsx TS error
# new (element: HTMLElement... is not callable...
sed -i 's/const myGlobe = GlobeJS({ animateIn: false })(container)/const myGlobe = new (GlobeJS as any)({ animateIn: false })(container)/g' src/components/home/Globe.tsx
# Or if it was `GlobeJS({ animateIn: false })(container)` we can just do `(GlobeJS as any)({ animateIn: false })(container)`.
sed -i 's/const myGlobe = GlobeJS({ animateIn: false })(container)/const myGlobe = (GlobeJS as any)({ animateIn: false })(container)/g' src/components/home/Globe.tsx
