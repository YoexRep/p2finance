import React, { useState } from 'react';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Checkbox } from '@mui/material';

const RecursiveTreeView  = ({ nodes, parentChecked, onNodeSelect }) => {
  
    const [selectedNodes, setSelectedNodes] = useState([]);
    const [isParentChecked, setIsParentChecked] = useState(parentChecked);
  
    const handleSelect = (event, nodeId) => {
      const selectedIndex = selectedNodes.indexOf(nodeId);
      let newSelected = [...selectedNodes];
  
      if (selectedIndex === -1) {
        newSelected = [...newSelected, nodeId];
      } else {
        newSelected.splice(selectedIndex, 1);
      }
  
      setSelectedNodes(newSelected);
      onNodeSelect(newSelected);
    };
  
    const handleToggle = (event, nodeId) => {
      const isChecked = selectedNodes.indexOf(nodeId) !== -1;
  
      if (isChecked) {
        setSelectedNodes(selectedNodes.filter((id) => id !== nodeId));
      } else {
        setSelectedNodes([...selectedNodes, nodeId]);
      }
  
      setIsParentChecked(!isChecked);
      onNodeSelect(selectedNodes);
    };

    
  return (
    <TreeView
    defaultCollapseIcon={<ExpandMoreIcon />}
    defaultExpandIcon={<ChevronRightIcon />}
  >
    {nodes.map((node) => (
      <TreeItem
        key={node.id}
        nodeId={node.id.toString()}
        label={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox
              checked={selectedNodes.indexOf(node.id.toString()) !== -1}
              indeterminate={isParentChecked}
              onChange={(event) => handleToggle(event, node.id.toString())}
            />
            {node.name}
          </div>
        }
        CheckboxProps={{ disableRipple: true }}
      >
        {Array.isArray(node.children) ? (
          node.children.map((childNode) => (
            <RecursiveTreeView
              key={childNode.id}
              nodes={[childNode]}
              parentChecked={isParentChecked}
              onNodeSelect={(selected) => setSelectedNodes(selected)}
            />
          ))
        ) : null}
      </TreeItem>
    ))}
  </TreeView>
  );
};

export default RecursiveTreeView;

