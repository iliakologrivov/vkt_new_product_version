## Usage

You can now consume the action by referencing the v1 branch

```yaml
uses: iliakologrivov/vkt_new_product_version@master
with:
    token: "${{ secrets.PRODUCT_API_TOKEN }}"
    product_id: <you product_id>
    title: "${{ github.event.head_commit.id }}"
    release_notes: "${{ github.event.head_commit.message }}"
    visible: 0
    set_rft: 0
```
