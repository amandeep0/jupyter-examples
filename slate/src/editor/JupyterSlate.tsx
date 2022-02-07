import { useCallback } from 'react';
import { Editor as SlateEditor, Range } from 'slate';
import { Editable, RenderPlaceholderProps } from 'slate-react';
import { Kernel } from '@datalayer/jupyter-react';
import Element from "./elements/Element";
import Leaf from "./leafs/Leaf";
import useEditorConfig from "./hooks/useEditorConfig";

const JupyterSlate = (props: { slateEditor: SlateEditor, kernel: Kernel, previousSelection: Range, selection: Range, Placeholder: React.FC<any> }) => {
  const { slateEditor, kernel, Placeholder } = props;
  const renderElement = useCallback(
    props => <Element kernel={kernel} {...props} />,
    []
  );
  const renderLeaf = useCallback(
    props => <Leaf {...props} />,
    []
  );
  const { keyBindings } = useEditorConfig(slateEditor);
  const onKeyDown = useCallback(
    (event) => keyBindings.onKeyDown(slateEditor, event),
    [keyBindings, slateEditor]
  );
  return (
    <Editable
      autoFocus={true}
      onKeyDown={onKeyDown}
      renderElement={renderElement}
      renderLeaf={renderLeaf}
      spellCheck={false}
      placeholder="Type something cool..."
      renderPlaceholder={({ children, attributes }: RenderPlaceholderProps) => <Placeholder children={children} attributes={attributes}/>}  
    />
  );
}

export default JupyterSlate;
