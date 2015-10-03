export default (key, spec, values)=>{
  const obj = {key, spec};
  values.forEach((value, i)=>{
    obj[`v${i}`] = value;
  });
  return obj;
};
