import React, { useMemo, useState } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import './GigFlexBar.css';

const deriveGigCoverageLakhs = (price) => {
  const value = Number(price);
  const effective = Number.isFinite(value) ? Math.max(199, Math.round(value)) : 199;

  if (effective >= 599) return { effectivePrice: effective, coverageLakhs: 5 };
  if (effective >= 499) return { effectivePrice: effective, coverageLakhs: 4 };
  if (effective >= 399) return { effectivePrice: effective, coverageLakhs: 3 };
  if (effective >= 299) return { effectivePrice: effective, coverageLakhs: 2 };
  return { effectivePrice: effective, coverageLakhs: 1 };
};

function GigFlexBar({ userProfile, onUpdate }) {
  const isGig = userProfile?.occupation === 'gig-worker';
  const derived = useMemo(() => deriveGigCoverageLakhs(userProfile?.gigPrice), [userProfile?.gigPrice]);

  const [localPrice, setLocalPrice] = useState(derived.effectivePrice);

  if (!isGig) return null;

  const coverageLabel = `₹${derived.coverageLakhs} Lakh`;

  const commitPrice = (next) => {
    const nextDerived = deriveGigCoverageLakhs(next);
    setLocalPrice(nextDerived.effectivePrice);
    if (typeof onUpdate === 'function') {
      onUpdate({
        gigPrice: nextDerived.effectivePrice,
        gigCoverageLakhs: nextDerived.coverageLakhs,
      });
    }
  };

  const selected = Array.isArray(userProfile?.gigCoverage) ? userProfile.gigCoverage.filter(Boolean) : [];

  return (
    <div className="gig-flex-bar" role="region" aria-label="Gig Worker flexible pricing">
      <div className="gig-flex-top">
        <div className="gig-flex-left">
          <div className="gig-flex-title">Gig Worker Flexible Coverage</div>
          <div className="gig-flex-sub">
            <FaInfoCircle /> Select your monthly price (min ₹199). Coverage increases automatically.
          </div>
        </div>
        <div className="gig-flex-right">
          <label className="gig-flex-input">
            <span className="gig-flex-currency">₹</span>
            <input
              type="number"
              inputMode="numeric"
              min="199"
              value={localPrice}
              onChange={(e) => setLocalPrice(e.target.value)}
              onBlur={() => commitPrice(localPrice)}
              aria-label="Monthly price"
            />
            <span className="gig-flex-suffix">/mo</span>
          </label>
        </div>
      </div>

      <input
        className="gig-flex-slider"
        type="range"
        min="199"
        max="599"
        step="1"
        value={derived.effectivePrice}
        onChange={(e) => commitPrice(Number(e.target.value))}
        aria-label="Monthly price slider"
      />

      <div className="gig-flex-bottom">
        <div className="gig-flex-pill">
          <span className="k">Coverage</span>
          <span className="v">{coverageLabel}</span>
        </div>
        <div className="gig-flex-pill">
          <span className="k">Selected</span>
          <span className="v">{selected.length > 0 ? selected.length : '—'}</span>
        </div>
      </div>
    </div>
  );
}

export default GigFlexBar;

