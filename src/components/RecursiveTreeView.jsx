import React, { useState } from 'react';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Checkbox } from '@mui/material';

const RecursiveTreeView = ({ nodes, parentChecked, onNodeSelect, style }) => {

  const [selectedNodes, setSelectedNodes] = useState([]);

  const handleSelect = (event, nodeId) => {
    const selectedIndex = selectedNodes.indexOf(nodeId);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = [...selectedNodes, nodeId];
    } else {
      newSelected = selectedNodes.filter((id) => id !== nodeId);
    }

    setSelectedNodes(newSelected);
    onNodeSelect(newSelected);
  };

  return (
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={style}
    >
      {nodes.map((node) => (
        <TreeItem
          key={node.id}
          nodeId={node.id.toString()}
          label={
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Checkbox
                checked={selectedNodes.indexOf(node.id.toString()) !== -1}
                onChange={(event) => handleSelect(event, node.id.toString())}
              />
              {node.name}
            </div>
          }
          CheckboxProps={{ disableRipple: true }}
        >
          {Array.isArray(node.children) ? (
            <RecursiveTreeView
              nodes={node.children}
              onNodeSelect={onNodeSelect}
            />
          ) : null}
        </TreeItem>
      ))}
    </TreeView>
  );
};

export default RecursiveTreeView;

