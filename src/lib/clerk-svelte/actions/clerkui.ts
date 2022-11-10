import type Clerk from '@clerk/clerk-js';

interface ClerkUIConfig {
  clerk?: Clerk;
  componentType: 'SignIn' | 'SignUp' | 'UserButton';
}

const COMPONENT_CONFIG: Record<ClerkUIConfig['componentType'], Record<string, unknown>> = {
  SignIn: {
    routing: 'path',
    path: '/sign-in',
    signUpUrl: '/sign-up',
  },
  SignUp: {
    routing: 'path',
    path: '/sign-up',
    signInUrl: '/sign-in',
  },
  UserButton: {
    showName: false,
    signInUrl: '/sign-in',
    userProfileMode: 'modal',
  },
};

export const clerkui = (node: HTMLDivElement, { clerk, componentType }: ClerkUIConfig) => {
  let cType = componentType;
  if (clerk) {
    clerk[`mount${componentType}`](node, COMPONENT_CONFIG[cType]);
  }
  return {
    update: ({ clerk, componentType }: ClerkUIConfig) => {
      if (cType !== componentType) {
        clerk?.[`unmount${cType}`](node);
        cType = componentType;
      }
      if (clerk) {
        clerk[`mount${cType}`](node, COMPONENT_CONFIG[cType]);
      }
    },
    destroy: () => {
      clerk?.[`unmount${cType}`](node);
    },
  };
};
