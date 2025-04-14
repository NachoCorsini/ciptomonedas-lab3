// tests/unit/LoginView.spec.js
import { mount } from '@vue/test-utils'
import LoginView from '@/views/LoginView.vue'
import { createStore } from 'vuex'

// Creamos un store de prueba
const store = createStore({
  state: { userId: null, userEmail: null },
  actions: {
    saveUserId: jest.fn(),
    saveUserEmail: jest.fn(),
  }
})

describe('LoginView.vue', () => {
  it('valida que muestre error si el email es inválido', async () => {
    const wrapper = mount(LoginView, {
      global: { plugins: [store] }
    })

    await wrapper.find('#email').setValue('emailIncorrecto')
    await wrapper.find('#password').setValue('Pass123')
    await wrapper.find('button').trigger('click')

    expect(wrapper.text()).toContain('El correo electrónico no es válido.')
  })

  it('valida que se muestre error si la contraseña es débil', async () => {
    const wrapper = mount(LoginView, {
      global: { plugins: [store] }
    })

    await wrapper.find('#email').setValue('correo@valido.com')
    await wrapper.find('#password').setValue('abc')
    await wrapper.find('button').trigger('click')

    expect(wrapper.text()).toContain('La contraseña no cumple con los requisitos.')
  })
})
