import React from 'react';

import {setAddon, storiesOf} from '@storybook/react';
import {
  withKnobs,
  color,
  number,
  object,
  select
} from '@storybook/addon-knobs/react';

import {MarkSeries} from 'react-vis';

import {generateScatterplotData, intRandom, random} from './storybook-data.js';
import {
  chooseColorScale,
  SimpleChartWrapper,
  jsxOptions
} from './storybook-utils.js';

function styledMarkSeries(props) {
  return (
    <MarkSeries
      data={props.data}
      opacity={number(
        'opacity',
        props.opacity || 1,
        {max: 1, min: 0, range: true, step: 0.01},
        'style'
      )}
      fill={color('fill', props.fill || '#12939a', 'style')}
      stroke={color('stroke', props.stroke || '#12939a', 'style')}
      strokeStyle={select(
        'strokeStyle',
        {solid: 'solid', dashed: 'dashed'},
        props.strokeStyle || 'solid',
        'style'
      )}
      strokeWidth={number('strokeWidth', props.strokeWidth || 2, 'style')}
      style={object('style', props.style || {}, 'style')}
    />
  );
}

storiesOf('Series/MarkSeries/Base', module)
  .addDecorator(withKnobs)
  .add(
    'Single scatterplot',
    () => {
      return (
        <SimpleChartWrapper>
          <MarkSeries data={generateScatterplotData({key: 'scatter1'})} />
        </SimpleChartWrapper>
      );
    }
  )
  .add(
    'Multiple MarkSeries',
    () => {
      return (
        <SimpleChartWrapper>
          <MarkSeries data={generateScatterplotData({key: 'scatter1'})} />
          <MarkSeries data={generateScatterplotData({key: 'scatter2'})} />
          <MarkSeries data={generateScatterplotData({key: 'scatter3'})} />
        </SimpleChartWrapper>
      );
    }
  );

storiesOf('Series/MarkSeries/Styling/By Datapoint', module)
  .addDecorator(withKnobs)
  .add(
    'color',
    () => {
      const {colorScale, colorRange} = chooseColorScale();
      return (
        <SimpleChartWrapper colorScale={colorScale} colorRange={colorRange}>
          <MarkSeries
            data={generateScatterplotData({
              key: 'scatter-color-1',
              extraParams: [['color', intRandom({})]]
            })}
          />
        </SimpleChartWrapper>
      );
    }
  )
  .add(
    'fill',
    () => {
      const {colorScale, colorRange} = chooseColorScale();
      return (
        <SimpleChartWrapper fillScale={colorScale} fillRange={colorRange}>
          <MarkSeries
            data={generateScatterplotData({
              key: 'scatter-fill-1',
              extraParams: [['fill', intRandom({})]]
            })}
          />
        </SimpleChartWrapper>
      );
    }
  )
  .add(
    'opacity',
    () => {
      return (
        <SimpleChartWrapper>
          <MarkSeries
            data={generateScatterplotData({
              key: 'scatter-opacity-1',
              extraParams: [['opacity', random({min: 0.5})]]
            })}
          />
        </SimpleChartWrapper>
      );
    }
  )
  .add(
    'size',
    () => {
      return (
        <SimpleChartWrapper>
          <MarkSeries
            data={generateScatterplotData({
              key: 'scatter-size-1',
              extraParams: [['size', random({min: 5, max: 20})]]
            })}
          />
        </SimpleChartWrapper>
      );
    }
  )
  .add(
    'stroke',
    () => {
      const {colorScale, colorRange} = chooseColorScale();
      return (
        <SimpleChartWrapper strokeScale={colorScale} strokeRange={colorRange}>
          <MarkSeries
            data={generateScatterplotData({
              key: 'scatter-stroke-1',
              extraParams: [['stroke', intRandom({})]]
            })}
            style={{strokeWidth: '2px'}}
          />
        </SimpleChartWrapper>
      );
    }
  );

storiesOf('Series/MarkSeries/Styling/At series level', module)
  .addDecorator(withKnobs)
  .add(
    'fill',
    () => {
      return (
        <SimpleChartWrapper>
          {styledMarkSeries({
            data: generateScatterplotData({key: 'scatter1'}),
            fill: '#2c51be'
          })}
        </SimpleChartWrapper>
      );
    }
  )
  .add(
    'opacity',
    () => {
      return (
        <SimpleChartWrapper>
          {styledMarkSeries({
            data: generateScatterplotData({key: 'scatter1'}),
            opacity: 0.5
          })}
        </SimpleChartWrapper>
      );
    }
  )
  .add(
    'stroke',
    () => {
      return (
        <SimpleChartWrapper>
          {styledMarkSeries({
            data: generateScatterplotData({key: 'scatter1'}),
            stroke: '#2c51be'
          })}
        </SimpleChartWrapper>
      );
    }
  )
  .add(
    'strokeWidth',
    () => {
      return (
        <SimpleChartWrapper>
          {styledMarkSeries({
            data: generateScatterplotData({key: 'scatter1'}),
            strokeWidth: '3px'
          })}
        </SimpleChartWrapper>
      );
    }
  )
  .add(
    'style',
    () => {
      return (
        <SimpleChartWrapper>
          {styledMarkSeries({
            data: generateScatterplotData({key: 'scatter1'}),
            style: {
              stroke: '#E48000',
              strokeOpacity: 0.5,
              strokeWidth: '3px'
            }
          })}
        </SimpleChartWrapper>
      );
    }
  );
