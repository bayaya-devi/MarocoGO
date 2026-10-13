export type CountryTheme = {
  id: string;
  logo: string;
  primary: string;
  secondary: string;
  accent: string;
  neutral: string;
  background: string;
  photographyStyle: string;
  typographyAccent: string;
  culturalMotionProfile: 'calm' | 'expressive' | 'cinematic';
};

export const marocogoTheme: CountryTheme = {
  id: 'marocogo',
  logo: 'logo/marocogo-full.png',
  primary: '#9E1B2A',
  secondary: '#17633D',
  accent: '#B8BBC0',
  neutral: '#73777A',
  background: '#F7F6F2',
  photographyStyle: 'architecture, gestes, matières et paysages marocains en lumière naturelle',
  typographyAccent: 'editorial-humanist',
  culturalMotionProfile: 'calm',
};
