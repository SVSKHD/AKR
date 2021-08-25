import React from "react"
import {Select} from "antd"

const {Option} = Select
const ProductForm = ({
handleChange , 
handleSubmit , 
setValues,
values,
handleCategoryChange,
subOptions,
showSub
}) =>{


const {
title,
subtitle,
description,
price,
categories,
category,
subs,
shipping,
quantity,
images,
colors,
brands,
color,
brand,
} = values;


const style={
    backgroundColor:"#051937",
    color:"white",
    fontFamily:"Montserrat",
    Text:{
    fontFamily:"Montserrat",
    color:"black"
    }
    }

return(
<form onSubmit={handleSubmit}>
<div className="form-group">
<h5 style={style.Text}>Title</h5 >
<input
type="text"
name="title"
className="form-control"
value={title}
onChange={handleChange}
/>
</div>

<div className="form-group">
<h5 style={style.Text}>Sub Title</h5 >
<input
type="text"
name="subtitle"
className="form-control"
value={subtitle}
onChange={handleChange}
/>
</div>

<div className="form-group">
<h5 style={style.Text}>Description</h5 >
<input
type="text"
name="description"
className="form-control"
value={description}
onChange={handleChange}
/>
</div>

<div className="form-group">
<h5 style={style.Text}>Price</h5 >
<input
type="number"
name="price"
className="form-control"
value={price}
onChange={handleChange}
/>
</div>

<div className="form-group">
<h5 style={style.Text}>Shipping</h5 >
<select
name="shipping"
className="form-control"
onChange={handleChange}
>
<option>Please select</option>
<option value="No">No</option>
<option value="Yes">Yes</option>
</select>
</div>

<div className="form-group">
<h5 style={style.Text}>Quantity</h5 >
<input
type="number"
name="quantity"
className="form-control"
value={quantity}
onChange={handleChange}
/>
</div>

<div className="form-group">
<h5 style={style.Text}>Color</h5 >
<select
name="color"
className="form-control"
onChange={handleChange}
>
<option>Please select</option>
{colors.map((c) => (
<option key={c} value={c}>
{c}
</option>
))}
</select>
</div>

<div className="form-group">
<h5 style={style.Text}>Brand</h5 >
<select
name="brand"
className="form-control"
onChange={handleChange}
>
<option>Please select</option>
{brands.map((b) => (
<option key={b} value={b}>
{b}
</option>
))}
</select>
</div>

<div className="form-group">
<h5 style={style.Text}>Category</h5 >
<select
name="category"
className="form-control"
onChange={handleCategoryChange}
>
<option>Please select</option>
{categories.length > 0 &&
categories.map((c) => (
<option key={c._id} value={c._id}>
{c.name}
</option>
))}
</select>
</div>

{subOptions ? subOptions.length : ""}

{showSub && (
<div>
<h5 style={style.Text}>Sub Categories</h5 >
<Select
mode="multiple"
style={{ width: "100%" }}
placeholder="Please select"
value={subs}
onChange={value => setValues({...values , subs : value})}
>
{subOptions.length &&
subOptions.map((s) => (
<Option key={s._id} value={s._id}>
{s.name}
</Option>
))}
</Select>
</div>
)}

<br/>


<button className="btn btn-raised">Create Product</button>
</form>
)
}
export default ProductForm