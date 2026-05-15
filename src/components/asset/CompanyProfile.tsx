'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { ExternalLink, Users, Building, MapPin } from 'lucide-react';

interface CompanyProfileProps {
  profile: any;
  isLoading: boolean;
}

export function CompanyProfile({ profile, isLoading }: CompanyProfileProps) {
  const [expanded, setExpanded] = useState(false);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>About</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <div className="grid grid-cols-2 gap-4 pt-4 mt-4 border-t border-border">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!profile) return null;

  const description = profile.description || 'No description available.';
  const isLongDescription = description.length > 300;
  const displayDescription = expanded ? description : `${description.slice(0, 300)}${isLongDescription ? '...' : ''}`;

  return (
    <Card>
      <CardHeader>
        <CardTitle>About {profile.companyName}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-text-secondary leading-relaxed space-y-4">
          <p>
            {displayDescription}
            {isLongDescription && (
              <button 
                onClick={() => setExpanded(!expanded)}
                className="ml-2 text-accent-emerald hover:text-emerald-400 font-medium transition-colors focus:outline-none"
              >
                {expanded ? 'Show less' : 'Read more'}
              </button>
            )}
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-6 mt-6 border-t border-border/50">
            {profile.ceo && (
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-text-secondary opacity-70 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs uppercase tracking-wider text-text-secondary opacity-70 mb-1">CEO</div>
                  <div className="text-sm font-medium text-text-primary">{profile.ceo}</div>
                </div>
              </div>
            )}
            
            {profile.industry && (
              <div className="flex items-start gap-3">
                <Building className="h-5 w-5 text-text-secondary opacity-70 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs uppercase tracking-wider text-text-secondary opacity-70 mb-1">Industry</div>
                  <div className="text-sm font-medium text-text-primary">{profile.industry}</div>
                </div>
              </div>
            )}
            
            {(profile.city || profile.country) && (
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-text-secondary opacity-70 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs uppercase tracking-wider text-text-secondary opacity-70 mb-1">Headquarters</div>
                  <div className="text-sm font-medium text-text-primary">
                    {profile.city ? `${profile.city}, ` : ''}{profile.country}
                  </div>
                </div>
              </div>
            )}
            
            {profile.website && (
              <div className="flex items-start gap-3">
                <ExternalLink className="h-5 w-5 text-text-secondary opacity-70 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs uppercase tracking-wider text-text-secondary opacity-70 mb-1">Website</div>
                  <a 
                    href={profile.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-accent-blue hover:text-blue-400 transition-colors inline-flex items-center"
                  >
                    Visit site
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
