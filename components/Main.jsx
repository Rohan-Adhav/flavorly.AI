import React from "react"
import ClaudeRecipe from "/components/FlavorlyAIRecipe"
import IngredientsList from "/components/IngredientsList"
import { getRecipeFromMistral } from "../src/ai"


export default function Main() {

    const [ingredients, setIngredients] = React.useState([])
    const [recipe,setRecipe ] = React.useState("")
    const recipeSection = React.useRef(null)
    const [error,setError] = React.useState("")
    async function getRecipe() {
        let recipeMarkDown = await getRecipeFromMistral(ingredients)
        setRecipe(recipeMarkDown)

    }
    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        if (!newIngredient){
            setError("Ingredients cannot be empty!")
        }
        else if(ingredients.includes(newIngredient)){
            setError("same ingredients are not allowed")
        }
        else{
            setIngredients(prevIngredients => [...prevIngredients, newIngredient])
            setError("")

        }
    }

    React.useEffect(()=>{
        if(recipe && recipeSection){
            recipeSection.current.scrollIntoView({behavior:"smooth"})
        }
    },[recipe])

    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>
            {error && <p className="error" style={{color:"red", marginTop:"0.5rem "}}>{error}</p>}


            {ingredients.length > 0 && 
            <IngredientsList 
            ingredients={ingredients} 
            getRecipe={getRecipe}
            ref={recipeSection}
            />}

            {recipe && <ClaudeRecipe recipe={recipe}/>}
        </main>
    )
}