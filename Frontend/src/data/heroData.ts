export interface HeroData {
  mainText: string;
  subtitle: string;
  buttons: {
    primary: string;
    secondary: string;
  };
}

export const heroData: HeroData = {
  mainText: "Build Your Technical Experience",
  subtitle: "TMU's First Student-Led AI Innovation Lab",
  buttons: {
    primary: "Join the Revolution",
    secondary: "Explore Projects"
  }
};