export const SelectActionComponent = (props) => {
  return (
    <select id={props.elementId} defaultValue="default" onChange={props.onChange}>
      <option value="default" disabled hidden>
        {props.header}
      </option>
      {props.options.map((option) => (
        <option key={option.id} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};
