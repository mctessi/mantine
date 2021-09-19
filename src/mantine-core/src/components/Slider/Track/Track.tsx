import React from 'react';
import { mergeStyles } from '@mantine/tss';
import { DefaultProps, MantineNumberSize, MantineColor } from '@mantine/theme';
import { Marks, MarksStylesNames } from '../Marks/Marks';
import useStyles from './Track.styles';

export type TrackStylesNames = keyof ReturnType<typeof useStyles>['classes'] | MarksStylesNames;

interface TrackProps extends DefaultProps<TrackStylesNames> {
  filled: number;
  offset: number;
  marks: { value: number; label?: React.ReactNode }[];
  size: MantineNumberSize;
  radius: MantineNumberSize;
  color: MantineColor;
  min: number;
  max: number;
  value: number;
  children: React.ReactNode;
  onChange(value: number): void;
}

export function Track({
  filled,
  size,
  color,
  classNames,
  styles,
  radius,
  children,
  offset,
  ...others
}: TrackProps) {
  const { classes } = useStyles({ color, size, radius }, classNames, 'slider');
  const _styles = mergeStyles(classes, styles);

  return (
    <div className={classes.track} style={_styles.track}>
      <div
        className={classes.bar}
        style={{ ..._styles.bar, left: `${offset}%`, width: `${filled}%` }}
      />

      {children}

      <Marks
        {...others}
        size={size}
        color={color}
        offset={offset}
        classNames={classNames}
        styles={styles}
      />
    </div>
  );
}

Track.displayName = '@mantine/core/SliderTrack';
