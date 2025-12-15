interface ICategory {
    _id?: string;
    name?: string;
    description?: string;
    icon?: fileList | string;
}

//use extends for get all properties and copy to new interface
//and use omit to remove some properties, and add new properties
//so here i create new interface ICategoryForm that extends ICategory (copy all properties in ICategory)
//but omit icon property(change type icon property), and add icon property with type FileList in ICategoryForm
// interface ICategoryForm extends Omit<ICategory, 'icon'> {
//     icon: FileList;
// }

export { ICategory};