import React, {Component, useCallback} from 'react';
import {ForceGraph2D} from 'react-force-graph';
import SpriteText from 'three-spritetext';

function addOpacityToHexColor(color, opacity = 0.5, mode = '#rrggbbaa') {
  const opacityHex = Math.round(opacity * 255).toString(16);
  if (mode === "#rrggbbaa")
    return color + opacityHex;
  else
    return "#" + opacityHex + color.slice(1);
}

export class ForceGraph extends Component {
  constructor(props) {super(props);}

  handleClick = (node) =>{this.props.getNodeName(node);}
   
  render() {
    const {data} = this.props;
    if (!data)
      return [];
    return (
      <ForceGraph2D
        graphData={data}
        width={window.innerWidth / 2}
        height={560}
        nodeAutoColorBy="group"
        linkAutoColorBy='group'
        nodeOpacity ={0.5}

        // 2d图用的属性
        nodeCanvasObject={(node, ctx) => {
          const label = node.id;
          const fontSize = node.match ? 8 : 4;
          ctx.font = `${fontSize}px Sans-Serif`;
          const textWidth = ctx.measureText(label).width;
          const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding

          ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);

          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = node.color;
          ctx.fillText(label, node.x, node.y);

          node.__bckgDimensions = bckgDimensions; // to re-use in nodePointerAreaPaint
        }}
        nodePointerAreaPaint={(node, color, ctx) => {
          ctx.fillStyle = color;
          const bckgDimensions = node.__bckgDimensions;
          bckgDimensions && ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);
        }}
        linkCanvasObjectMode = {() => 'after'}
        linkCanvasObject={(link,ctx) => {
          let label = link.relation;
          if (label==='出处') {return}
          const start = link.source;
          const end = link.target;
          // calculate label positioning
          const textPos = Object.assign(...['x', 'y'].map(c => ({
            [c]: start[c] + (end[c] - start[c]) / 2 // calc middle point
          })));
          const relLink = { x: end.x - start.x, y: end.y - start.y };

          const fontSize = link.match ? 8 : 4;
          ctx.font = `${fontSize}px Sans-Serif`;
          const textWidth = ctx.measureText(label).width;
          const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding
          // draw text label (with background rect)
          ctx.save();
          ctx.translate(textPos.x, textPos.y);

          ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.fillRect(- bckgDimensions[0] / 2, - bckgDimensions[1] / 2, ...bckgDimensions);

          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = link.color;
          // label = link.moda+label
          ctx.fillText(label, 0, 0);
          ctx.restore();
        }}
        
        // 3d图用的属性
        nodeThreeObject={node => {
          const sprite = new SpriteText(node.id);
          sprite.color = node.match ? addOpacityToHexColor(node.color, 0.5) : node.color;
          sprite.textHeight = node.match ? 14 : 10;
          sprite.fontWeight = node.match ? 'bold' : 'normal';
          return sprite;
        }}
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
        linkPositionUpdate={(sprite, {start, end}) => {
          const middlePos = Object.assign(...['x', 'y', 'z'].map(c => ({
            [c]: start[c] + (end[c] - start[c]) / 2 // calc middle point
          })));
          // Position sprite
          Object.assign(sprite.position, middlePos);
        }}

        linkWidth={link => link.match ? 2:1}
        linkOpacity={0.3}
        // 匹配边上的移动小球
        linkDirectionalParticles={link => link.match ? 1 : 0}
        linkDirectionalParticleWidth={3}
        linkDirectionalParticleSpeed={0.005}

        backgroundColor={'rgba(255,255,255,0)'}
        // enableNodeDrag={false}
        onNodeClick={(node,e) => {
          this.handleClick(node.idx);e.preventDefault();}}
      />
    )
  }
}