import React from 'react'
import { Button, Drawer } from 'antd'
import useLanguage from "../utils/useLanguage";


const MenuPageDrawer = ({open, setOpen}) => {
  const translate = useLanguage()
  

    const onClose=()=>{
        setOpen(false)
    }
  return (
    <Drawer
    title={translate("Fill out the form")}
    placement="right"
    onClose={onClose}
    open={open}
    width={"50%"}
    >
    <div className="form-container">
        <form className="companyForm">
            <div className="form__sections">
                <div className="form__sections-section">
                    <label htmlFor="name">{translate("Menu name")}</label>
                    <input type="text" id='name' name='name' />
                </div>
                <div className="form__sections-section">
                    <label htmlFor="name_ru">{translate("Menu name in russian")}</label>
                    <input type="text" id='name_ru' name='name_ru'/>
                </div>
            </div>
            <div className="form__sections">
                <div className="form__sections-section">
                    <label htmlFor="link">{translate("Link")}</label>
                    <input type="text" id='link' name='link' />
                </div>
            </div>
            <Button type='primary' className='form__submit-btn'>{translate("Save")} </Button>
        </form>
    </div>
    </Drawer>
  )
}

export default MenuPageDrawer