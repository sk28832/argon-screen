// app/api/trials/route.ts
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { ClinicalTrial } from '@/types';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'ctg-studies.csv');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
    });

    // Properly map and validate the data
    const trials: ClinicalTrial[] = records.map((record: any) => ({
      nct_number: record['NCT Number'] || '',
      study_title: record['Study Title'] || '',
      study_url: record['Study URL'] || `https://clinicaltrials.gov/study/${record['NCT Number']}`,
      study_status: record['Study Status'] || '',
      conditions: record['Conditions'] || '',
      interventions: record['Interventions'] || '',
      sponsor: record['Sponsor'] || '',
      collaborators: record['Collaborators'] || '',
      study_type: record['Study Type'] || ''
    }));

    return NextResponse.json(trials);
  } catch (error) {
    console.error('Error loading trials:', error);
    return NextResponse.json({ error: 'Failed to load trials' }, { status: 500 });
  }
}