import React from 'react';

type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'overline';

type TypographyProps = {
  variant?: TypographyVariant;
  children: React.ReactNode;
  className?: string;
};

const variantClasses: Record<TypographyVariant, string> = {
  h1: 'text-4xl font-bold',
  h2: 'text-3xl font-bold',
  h3: 'text-2xl font-bold',
  h4: 'text-xl font-bold',
  h5: 'text-lg font-bold',
  h6: 'text-base font-bold',
  subtitle1: 'text-lg font-medium',
  subtitle2: 'text-base font-medium',
  body1: 'text-base',
  body2: 'text-sm',
  caption: 'text-xs',
  overline: 'text-xs uppercase tracking-wide',
};

const Typography: React.FC<TypographyProps> = ({ variant = 'body1', children, className }) => {
  const combinedClassName = `${variantClasses[variant]} ${className || ''}`;

  switch (variant) {
    case 'h1':
      return <h1 className={combinedClassName}>{children}</h1>;
    case 'h2':
      return <h2 className={combinedClassName}>{children}</h2>;
    case 'h3':
      return <h3 className={combinedClassName}>{children}</h3>;
    case 'h4':
      return <h4 className={combinedClassName}>{children}</h4>;
    case 'h5':
      return <h5 className={combinedClassName}>{children}</h5>;
    case 'h6':
      return <h6 className={combinedClassName}>{children}</h6>;
    case 'subtitle1':
    case 'subtitle2':
    case 'body1':
    case 'body2':
    case 'caption':
    case 'overline':
      return <p className={combinedClassName}>{children}</p>;
    default:
      return <p className={combinedClassName}>{children}</p>;
  }
};

export default Typography;