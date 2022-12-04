<template>
    <v-card elevation="4">
        <v-snackbar
          v-model="erro"
          color="red accent-2">
          {{ erroMensagem }}

          <template v-slot:action="{ attrs }">
            <v-btn
              outlined
              v-bind="attrs"
              @click="erro = false">
              FECHAR
            </v-btn>
          </template>
        </v-snackbar>
        <v-card-text>
            <v-row class="my-2 pt-4" justify="center">
                <v-col cols="12" class="py-0">
                    <v-row justify="center">
                        <v-col cols="6" md="2">
                            <v-text-field v-model="index" label="Index" outlined disabled/>
                        </v-col>
                        <v-col cols="6" md="2">
                            <v-text-field v-model="id" label="Id" outlined disabled/>
                        </v-col>
                        <v-col cols="6" md="2">
                            <v-text-field
                                v-model="novo"
                                label="Ordem"
                                type="number"
                                outlined/>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="12" class="py-0">
                    <v-row justify="center" class="text-right">
                        <v-col cols="6">
                            <v-btn class="mr-2" @click="LimparOrdem()">Limpar</v-btn>
                            <v-btn
                                color="primary"
                                @click="AlterarOrdem()">
                                Salvar
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-text>
            <v-data-table
                :headers="cabecalho"
                :items="listaElementos"
                sort-by="ordem"
                :items-per-page="20">
                <template #[`item.edit`]="{ item }">
                    <v-btn
                        icon
                        @click="EditarElemento(item.ordem)">
                        <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                </template>
                <template #[`item.delete`]="{ item }">
                  <v-btn
                    icon
                    @click="RemoverElemento(item.ordem)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </template>
            </v-data-table>
        </v-card-text>
        <v-divider/>
        <v-card-actions>
            <v-row justify="center" class="my-2">
              <v-col cols="12">
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title class="text-h5">Adicionar Elemento</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col cols="12">
                <v-row class="my-2" justify="center">
                  <v-col cols="12" class="py-0">
                    <v-row justify="center">
                      <v-col cols="12" md="2">
                          <v-text-field v-model="novoIndex" label="Index" outlined/>
                      </v-col>
                      <v-col cols="12" md="2">
                          <v-text-field v-model="novoId" label="Id" outlined/>
                      </v-col>
                      <v-col cols="12" md="2">
                          <v-text-field
                              v-model="novoOrdem"
                              label="Ordem"
                              type="number"
                              outlined/>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" class="py-0">
                    <v-row justify="center" class="text-right">
                      <v-col cols="6">
                        <v-btn
                            color="primary"
                            fab
                            @click="AdicionarElemento()">
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
        </v-card-actions>
    </v-card>
</template>

<script>
import Elemento from '../models/elemento'

export default {
  data: () => ({
    cabecalho: [
      { text: 'Ordem', value: 'ordem' },
      { text: 'Index', value: 'index', align: 'center', sortable: false },
      { text: 'Id', value: 'id', align: 'center', sortable: false },
      { text: 'Editar', value: 'edit', align: 'center', sortable: false },
      { text: 'Excluir', value: 'delete', align: 'center', sortable: false }
    ],
    erro: false,
    erroMensagem: '',
    listaElementos: [],
    index: '',
    id: '',
    novo: '',
    antigo: '',
    novoId: '',
    novoIndex: '',
    novoOrdem: ''
  }),
  mounted () {
    this.listaElementos.push(new Elemento(0, 1, 10))
    this.listaElementos.push(new Elemento(5, 6, 60))
    this.listaElementos.push(new Elemento(1, 2, 20))
    this.listaElementos.push(new Elemento(3, 4, 40))
    this.listaElementos.push(new Elemento(4, 5, 50))
    this.listaElementos.push(new Elemento(7, 8, 80))
    this.listaElementos.push(new Elemento(2, 3, 30))
    this.listaElementos.push(new Elemento(6, 7, 70))
    this.listaElementos.push(new Elemento(9, 10, 100))
    this.listaElementos.push(new Elemento(8, 9, 90))
  },
  methods: {
    EditarElemento (ordem) {
      this.listaElementos.forEach(value => {
        if (value.ordem === ordem) {
          this.index = value.index
          this.id = value.id
          this.novo = value.ordem
          this.antigo = value.ordem
        }
      })
    },
    AlterarOrdem () {
      if (this.listaElementos.length < this.novo) {
        this.erro = true
        this.erroMensagem = 'Posição maior que a permitida'
      } else if (this.novo < 1) {
        this.erro = true
        this.erroMensagem = 'Posição precisa ser maior que zero'
      } else {
        this.listaElementos.sort((a, b) => a.ordem - b.ordem)
        this.listaElementos.forEach(value => {
          if (value.ordem === this.antigo) {
            value.ordem = parseInt(this.novo)
          } else if (value.ordem === parseInt(this.novo) && this.antigo > this.novo) {
            value.ordem += 1
          } else if (value.ordem === parseInt(this.novo) && this.antigo < this.novo) {
            value.ordem -= 1
          } else if (parseInt(this.antigo) < parseInt(this.novo) && value.ordem > parseInt(this.antigo) && value.ordem < parseInt(this.novo)) {
            value.ordem -= 1
          } else if (parseInt(this.antigo) > parseInt(this.novo) && value.ordem > parseInt(this.novo) && value.ordem < parseInt(this.antigo)) {
            value.ordem += 1
          }
        })
        this.novo = ''
        this.antigo = ''
        this.id = ''
        this.index = ''
      }
    },
    LimparOrdem () {
      this.novo = ''
      this.antigo = ''
      this.id = ''
      this.index = ''
    },
    AdicionarElemento () {
      if (this.listaElementos.length + 1 < this.novoOrdem) {
        this.erro = true
        this.erroMensagem = 'Posição maior que a permitida'
      } else if (this.novoOrdem < 1) {
        this.erro = true
        this.erroMensagem = 'Posição precisa ser maior que zero'
      } else {
        this.listaElementos.sort((a, b) => a.ordem - b.ordem)
        this.listaElementos.forEach(value => {
          if (value.ordem >= this.novoOrdem) {
            value.ordem += 1
          }
        })
        this.listaElementos.push(new Elemento(this.novoIndex, parseInt(this.novoOrdem), this.novoId))
        this.novoIndex = ''
        this.novoOrdem = ''
        this.novoId = ''
      }
    },
    RemoverElemento (ordem) {
      this.listaElementos.sort((a, b) => a.ordem - b.ordem)
      let aux = 0
      let index = 0
      this.listaElementos.forEach(value => {
        if (value.ordem === ordem) {
          index = aux
        } else if (value.ordem > ordem) {
          value.ordem -= 1
        }
        aux++
      })
      this.listaElementos.splice(index, 1)
    }
  }
}
</script>
