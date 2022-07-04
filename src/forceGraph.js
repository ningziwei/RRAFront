import React, {Component, useCallback} from 'react';
import {ForceGraph3D} from 'react-force-graph';
import SpriteText from 'three-spritetext';

function addOpacityToHexColor(color, opacity = 0.5, mode = '#rrggbbaa') {
  const opacityHex = Math.round(opacity * 255).toString(16);
  if (mode === "#rrggbbaa")
    return color + opacityHex;
  else
    return "#" + opacityHex + color.slice(1);
}

var color_dict = {"food":'rgba(255,215,0,1)',"disease":'rgba(65,105,225,1)',"time":'rgba(255,0,0,1)',"symptom":'rgba(60,179,113,1)'}
export class ForceGraph extends Component {
  constructor(props) {super(props);}

  handleClick = (node) =>{this.props.getNodeName(node);}
   
  render() {
    const {data} = this.props;
    console.log('force 56we', data)
    if (!data)
      return [];
    return (
      <ForceGraph3D
        graphData={data}
        width={window.innerWidth / 2}
        height={window.innerHeight}
        nodeAutoColorBy="group"
        // nodeColor = {color_dict["group"]}
        nodeOpacity ={0.5}
        nodeThreeObject={node => {
          const sprite = new SpriteText(node.id);
          sprite.color = node.match ? addOpacityToHexColor(node.color, 0.5) : node.color;
          sprite.textHeight = node.match ? 14 : 10;
          sprite.fontWeight = node.match ? 'bold' : 'normal';
          return sprite;
        }}
        linkAutoColorBy='group'
        linkThreeObjectExtend={true}
        linkThreeObject={link => {
          // extend link with text sprite
          //const sprite = new SpriteText(link.relation);
          const sprite = new SpriteText(link.relation)
          sprite.color = link.match ? link.color:addOpacityToHexColor(link.color, 0.7);
          sprite.textHeight = link.index ? 10 : 5;
          sprite.fontWeight = link.match ? 'normal' : 'bold';
          return sprite;
        }}
        linkWidth={link => link.match ? 1:0.5}
        linkOpacity={0.3}
        linkPositionUpdate={(sprite, {start, end}) => {
          const middlePos = Object.assign(...['x', 'y', 'z'].map(c => ({
            [c]: start[c] + (end[c] - start[c]) / 2 // calc middle point
          })));
          // Position sprite
          Object.assign(sprite.position, middlePos);
        }}
        linkDirectionalParticles={link => link.match ? 1 : 0}
        linkDirectionalParticleWidth={2}
        linkDirectionalParticleSpeed={0.005}

        backgroundColor={'rgba(255,255,255,0)'}
        // enableNodeDrag={false}
        onNodeClick={(node,e) => {
          this.handleClick(node.idx);e.preventDefault();}}
      />

    )
  }
}