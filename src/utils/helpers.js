


export const sortMenu = (arr) => {
  arr.sort((a, b) => a.parent - b.parent);
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    let parent = arr[i];
    if (newArr.length === 0) {
      newArr.push({ ...parent, children: [] });
    } else {
      let length = newArr.length;
      let index = -1;
      for (let j = 0; j < length; j++) {
        if (newArr[j].id === parent.parent) {
          index = j;
        }
      }

      index === -1
        ? newArr.push({ ...parent, children: [] })
        : newArr[index].children.push(parent);
    }
  }
  return newArr;
};



export const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");

    const deleteA =(str)=> {
      return str[0] + str.slice(2);
    }

    export const openToken=(token)=> {
      let [header, payload, signature] = token.split(".");
      return [deleteA(header), deleteA(payload), deleteA(signature)].join(".");
    }



    export  const validate = (name, value, err, setErr) => {
      let clone = { ...err };
      if (value.length === 0) {
        clone[name] = true;
      } else {
        clone[name] = false;
      }
      setErr(clone);
    };

    
