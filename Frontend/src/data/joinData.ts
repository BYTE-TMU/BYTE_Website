export interface JoinData {
  headline: string
  subheadline: string
  buttons: {
    discord: {
      text: string
      url: string
    }
    form: {
      text: string
      url: string
    }
  }
  additionalInfo: string
}

export const joinData: JoinData = {
  headline: "Join BYTE",
  subheadline: "Start your technical experience today",
  buttons: {
    discord: {
      text: "Join Discord",
      url: "https://discord.gg/byte-community"
    },
    form: {
      text: "Fill out form",
      url: "#join-form"
    }
  },
  additionalInfo: "Join our community of innovators, developers, and tech enthusiasts at Toronto Metropolitan University"
};